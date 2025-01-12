import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthTopics } from '@azkaban/shared';
import { LoginDAO, RegisterDAO } from './auth.dao';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(AuthTopics.LOGIN);
		this.client.subscribeToResponseOf(AuthTopics.REGISTER);
		await this.client.connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close();
	}

	async login(data: LoginDTO): Promise<LoginDAO> {
		return await this.client.send(AuthTopics.LOGIN, data).toPromise();
	}

	async register(data: RegisterDTO): Promise<RegisterDAO> {
		return await this.client.send(AuthTopics.REGISTER, data).toPromise();
	}
}
