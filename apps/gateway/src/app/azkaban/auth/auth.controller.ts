import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('register')
	async register(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.register(email, username, password);
	}

	@Post('login')
	async login(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.login(username, password);
	}

	@Post('forgot-password')
	async forgotPassword(@Body('email') email: string) {
		return await this.service.forgotPassword(email);
	}

	@Post('activate')
	async activate(@Body('email') email: string, @Body('token') token: string) {
		return await this.service.activate(email, token);
	}

	@Post('deactivate')
	async deactivate(
		@Body('email') email: string,
		@Body('token') token: string,
	) {
		return await this.service.deactivate(email, token);
	}
}
