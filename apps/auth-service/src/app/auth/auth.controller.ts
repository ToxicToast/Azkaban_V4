import { Controller } from '@nestjs/common';
import { AuthRoutes, AzkabanAuthTopics } from '@azkaban/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller(AuthRoutes.CONTROLLER)
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@MessagePattern(AzkabanAuthTopics.LOGIN)
	async login(@Payload() data: any): Promise<unknown> {
		return await this.service.login(data.username, data.password);
	}

	@MessagePattern(AzkabanAuthTopics.REGISTER)
	async register(@Payload() data: any): Promise<unknown> {
		return await this.service.register(
			data.email,
			data.username,
			data.password,
		);
	}

	@MessagePattern(AzkabanAuthTopics.FORGET_PASSWORD)
	async reset(@Payload() data: any): Promise<any> {
		return await this.service.reset(data.email, data.username);
	}
}
