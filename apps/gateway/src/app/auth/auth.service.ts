import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { AuthDAO, KafkaAuthService } from '@azkaban/gateway-infrastructure';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {

	constructor(
		private readonly client: KafkaAuthService,
	) { }

	async onModuleInit(): Promise<void> {
		await this.client.onModuleInit();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.onModuleDestroy();
	}

	async register(email: string, username: string, password: string): Promise<AuthDAO> {
		return await this.client.onRegister({ email, username, password });
	}

	async login(username: string, password: string): Promise<AuthDAO> {
		return await this.client.onLogin({ username, password });
	}

	async forgotPassword(email: string): Promise<AuthDAO> {
		return await this.client.onForgotPassword({ email });
	}

	async version(): Promise<unknown> {
		return await this.client.onVersion();
	}

}