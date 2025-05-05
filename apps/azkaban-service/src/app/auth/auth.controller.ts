import { Controller, Logger } from '@nestjs/common';
import { AzkabanAuthTopics, ControllerHelper } from '@azkaban/shared';
import { AuthService } from './auth.service';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserLoginDTO } from '../../utils';

@Controller(ControllerHelper('auth'))
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Span(AzkabanAuthTopics.LOGIN + '.service')
	@MessagePattern(AzkabanAuthTopics.LOGIN)
	async login(@Payload() payload: UserLoginDTO) {
		Logger.log('Login User', payload);
		return this.service.authLogin(payload);
	}
}
