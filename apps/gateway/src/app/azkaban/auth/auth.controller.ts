import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLinks } from '@azkaban/gateway-infrastructure';

@Controller(AuthLinks.CONTROLLER)
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post(AuthLinks.POST_REGISTER)
	async register(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.register(email, username, password);
	}

	@Post(AuthLinks.POST_LOGIN)
	async login(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.login(username, password);
	}

	@Post(AuthLinks.POST_FORGOT_PASSWORD)
	async forgotPassword(@Body('email') email: string) {
		return await this.service.forgotPassword(email);
	}
}
