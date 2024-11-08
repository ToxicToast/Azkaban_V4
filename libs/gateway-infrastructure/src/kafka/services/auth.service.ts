import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthEvents, AuthTopics } from '@toxictoast/azkaban-broker-kafka';
import { ForgotPasswordDTO, LoginDTO, RegisterDTO } from '../../dto';
import { AuthDAO } from '../../dao';

@Injectable()
export class KafkaAuthService implements OnModuleInit, OnModuleDestroy {

	private readonly logger: Logger = new Logger(KafkaAuthService.name);

	constructor(
		@Inject('AZKABAN_AUTH') private readonly client: ClientKafka,
	) {
	}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(AuthTopics.REGISTER);
		this.client.subscribeToResponseOf(AuthTopics.LOGIN);
		this.client.subscribeToResponseOf(AuthTopics.FORGOT_PASSWORD);
		this.client.subscribeToResponseOf(AuthTopics.VERSION);
		await this.client.connect().catch((error) => {
			this.logger.error(error);
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close().catch((error) => {
			this.logger.error(error);
		});
	}

	async loginSuccessful(data: unknown): Promise<void> {
		await this.client.emit(AuthEvents.LOGIN_SUCCESSFUL, data).toPromise().catch((error) => {
			this.logger.error(error);
		});
	}

	async registerSuccessful(data: unknown): Promise<void> {
		await this.client.emit(AuthEvents.REGISTER_SUCCESSFUL, data).toPromise().catch((error) => {
			this.logger.error(error);
		});
	}

	async forgotPasswordSuccessful(data: unknown): Promise<void> {
		await this.client.emit(AuthEvents.FORGOT_PASSWORD_SUCCESSFUL, data).toPromise().catch((error) => {
			this.logger.error(error);
		});
	}

	async onRegister(data: RegisterDTO): Promise<AuthDAO> {
		return await this.client.send(AuthTopics.REGISTER, data).toPromise().catch((error) => {
			this.logger.error(error);
		}).then((response) => {
			this.registerSuccessful(response);
			return response;
		});
	}

	async onLogin(data: LoginDTO): Promise<AuthDAO> {
		return await this.client.send(AuthTopics.LOGIN, data).toPromise().catch((error) => {
			this.logger.error(error);
		}).then((response) => {
			this.loginSuccessful(response);
			return response;
		});
	}

	async onForgotPassword(data: ForgotPasswordDTO): Promise<AuthDAO> {
		return await this.client.send(AuthTopics.FORGOT_PASSWORD, data).toPromise().catch((error) => {
			this.logger.error(error);
		}).then((response) => {
			this.forgotPasswordSuccessful(response);
			return response;
		});
	}

	async onVersion(): Promise<unknown> {
		return await this.client.send(AuthTopics.VERSION, {}).toPromise().catch((error) => {
			this.logger.error(error);
		});
	}

}