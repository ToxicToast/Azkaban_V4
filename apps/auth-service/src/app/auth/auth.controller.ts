import { Controller } from '@nestjs/common';
import { AuthRoutes, AzkabanAuthTopics } from '@azkaban/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller({
	path: AuthRoutes.CONTROLLER,
	version: '1',
})
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@MessagePattern(AzkabanAuthTopics.LOGIN)
	async login(
		@Payload('email') email: string,
		@Payload('password') password: string,
	): Promise<unknown> {
		return await this.service.login(email, password);
	}

	@MessagePattern(AzkabanAuthTopics.REGISTER)
	async register(
		@Payload('email') email: string,
		@Payload('username') username: string,
		@Payload('password') password: string,
	): Promise<unknown> {
		return await this.service.register(email, username, password);
	}

	@MessagePattern(AzkabanAuthTopics.PROFILE)
	async profile(@Payload('token') token: string): Promise<unknown> {
		return await this.service.profile(token);
	}

	@MessagePattern(AzkabanAuthTopics.FORGET_PASSWORD)
	async reset(@Payload('email') email: string): Promise<unknown> {
		return await this.service.reset(email);
	}
}
