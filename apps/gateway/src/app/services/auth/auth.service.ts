import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthTopics } from '@azkaban/shared';
import { ForgetPasswordDTO, LoginDTO, RegisterDTO } from './dto';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { CommandBus } from '@nestjs/cqrs';
import {
	ForgetPasswordCommand,
	LoginCommand,
	RegisterCommand,
} from './commands';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly commandBus: CommandBus,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(AuthTopics.LOGIN);
		this.client.subscribeToResponseOf(AuthTopics.REGISTER);
		this.client.subscribeToResponseOf(AuthTopics.FORGET_PASSWORD);
		await this.client.connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close();
	}

	async login(data: LoginDTO): Promise<LoginDAO> {
		return await this.commandBus.execute(
			new LoginCommand(data.username, data.password),
		);
	}

	async register(data: RegisterDTO): Promise<RegisterDAO> {
		return await this.commandBus.execute(
			new RegisterCommand(data.email, data.username, data.password),
		);
	}

	async forgetPassword(data: ForgetPasswordDTO): Promise<ForgetPasswordDAO> {
		return await this.commandBus.execute(
			new ForgetPasswordCommand(data.email, data.username),
		);
	}
}
