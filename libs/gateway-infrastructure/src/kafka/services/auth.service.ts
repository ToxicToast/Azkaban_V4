import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthEvents, AuthTopics } from '@toxictoast/azkaban-broker-kafka';
import { ForgotPasswordDTO, LoginDTO, RegisterDTO } from '../../dto';
import { AuthDAO } from '../../dao';
import { CrudService } from './crud.service';

@Injectable()
export class KafkaAuthService implements OnModuleInit, OnModuleDestroy {
	private readonly logger: Logger = new Logger(KafkaAuthService.name);

	constructor(
		@Inject('AZKABAN_BROKER') private readonly client: ClientKafka,
		private readonly crudService: CrudService<AuthDAO>,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(AuthTopics.REGISTER);
		this.client.subscribeToResponseOf(AuthTopics.LOGIN);
		this.client.subscribeToResponseOf(AuthTopics.FORGOT_PASSWORD);
		this.client.subscribeToResponseOf(AuthTopics.ACTIVATE);
		this.client.subscribeToResponseOf(AuthTopics.DEACTIVATE);
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

	async onRegister(data: RegisterDTO): Promise<AuthDAO> {
		return await this.crudService.onCreate(
			AuthTopics.REGISTER,
			AuthEvents.REGISTER_SUCCESSFUL,
			AuthEvents.REGISTER_FAILED,
			data,
		);
	}

	async onLogin(data: LoginDTO): Promise<AuthDAO> {
		return await this.crudService.onCreate(
			AuthTopics.LOGIN,
			AuthEvents.LOGIN_SUCCESSFUL,
			AuthEvents.LOGIN_FAILED,
			data,
		);
	}

	async onForgotPassword(data: ForgotPasswordDTO): Promise<AuthDAO> {
		return await this.crudService.onCreate(
			AuthTopics.FORGOT_PASSWORD,
			AuthEvents.FORGOT_PASSWORD_SUCCESSFUL,
			AuthEvents.FORGOT_PASSWORD_FAILED,
			data,
		);
	}

	async onActivate(data: unknown): Promise<AuthDAO> {
		return await this.crudService.onCreate(
			AuthTopics.ACTIVATE,
			AuthEvents.ACTIVATE_SUCCESSFUL,
			AuthEvents.ACTIVATE_FAILED,
			data,
		);
	}

	async onDeactivate(data: unknown): Promise<AuthDAO> {
		return await this.crudService.onCreate(
			AuthTopics.DEACTIVATE,
			AuthEvents.DEACTIVATE_SUCCESSFUL,
			AuthEvents.DEACTIVATE_FAILED,
			data,
		);
	}

	async onVersion(): Promise<unknown> {
		return await this.client
			.send(AuthTopics.VERSION, {})
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
			});
	}
}
