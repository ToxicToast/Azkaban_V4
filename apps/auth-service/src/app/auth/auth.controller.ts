import { Controller } from '@nestjs/common';
import { AuthRoutes, AzkabanAuthTopics } from '@azkaban/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller(AuthRoutes.CONTROLLER)
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@MessagePattern(AzkabanAuthTopics.LOGIN)
	async login(
		@Payload('username') username: string,
		@Payload('password') password: string,
	): Promise<unknown> {
		return await this.service.login(username, password);
	}

	@MessagePattern(AzkabanAuthTopics.REGISTER)
	async register(
		@Payload('email') email: string,
		@Payload('username') username: string,
		@Payload('password') password: string,
	): Promise<unknown> {
		return await this.service.register(email, username, password);
	}

	@MessagePattern(AzkabanAuthTopics.FORGET_PASSWORD)
	async reset(
		@Payload('email') email: string,
		@Payload('username') username: string,
	): Promise<unknown> {
		return await this.service.reset(email, username);
	}
}
