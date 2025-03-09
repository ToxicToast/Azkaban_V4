import { Controller, HttpStatus } from '@nestjs/common';
import { AuthRoutes, AzkabanAuthTopics } from '@azkaban/shared';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
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
		if (!email) {
			throw new RpcException({
				message: 'Email is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!password) {
			throw new RpcException({
				message: 'Password is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		return await this.service.login(email, password);
	}

	@MessagePattern(AzkabanAuthTopics.REGISTER)
	async register(
		@Payload('email') email: string,
		@Payload('username') username: string,
		@Payload('password') password: string,
	): Promise<unknown> {
		if (!email) {
			throw new RpcException({
				message: 'Email is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!username) {
			throw new RpcException({
				message: 'Username is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!password) {
			throw new RpcException({
				message: 'Password is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		return await this.service.register(email, username, password);
	}

	@MessagePattern(AzkabanAuthTopics.FORGET_PASSWORD)
	async reset(@Payload('email') email: string): Promise<unknown> {
		if (!email) {
			throw new RpcException({
				message: 'Email is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		return await this.service.reset(email);
	}
}
