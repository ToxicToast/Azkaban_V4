import {
	Body,
	Controller,
	HttpException,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
	AuthPermissions,
	PermissionGuard,
} from '@azkaban/gateway-infrastructure';

@Controller('auth')
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('register')
	@UseGuards(PermissionGuard(AuthPermissions.CAN_REGISTER))
	async register(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service
			.register(email, username, password)
			.catch((error) => {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			});
	}

	@Post('login')
	@UseGuards(PermissionGuard(AuthPermissions.CAN_LOGIN))
	async login(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service.login(username, password).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Post('forgot-password')
	@UseGuards(PermissionGuard(AuthPermissions.CAN_FORGOT_PASSWORD))
	async forgotPassword(@Body('email') email: string) {
		return await this.service.forgotPassword(email).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Post('activate')
	@UseGuards(PermissionGuard(AuthPermissions.CAN_ACTIVATE))
	async activate(@Body('email') email: string, @Body('token') token: string) {
		return await this.service.activate(email, token).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Post('deactivate')
	@UseGuards(PermissionGuard(AuthPermissions.CAN_DEACTIVATE))
	async deactivate(
		@Body('email') email: string,
		@Body('token') token: string,
	) {
		return await this.service.deactivate(email, token).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}
}
