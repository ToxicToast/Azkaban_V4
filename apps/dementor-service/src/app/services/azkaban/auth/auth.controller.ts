import { Body, Controller, Post } from '@nestjs/common';
import { AzkabanAuthTopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { AuthService } from './auth.service';

@Controller(ControllerHelper('azkaban/auth'))
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Span(AzkabanAuthTopics.LOGIN + '.dementor')
	@Post('/login')
	async login(@Body() body: { username: string; password: string }) {
		return await this.service.login(body);
	}

	@Span(AzkabanAuthTopics.REGISTER + '.dementor')
	@Post('/register')
	async register(
		@Body() body: { username: string; password: string; email: string },
	) {
		return await this.service.register(body);
	}
}
