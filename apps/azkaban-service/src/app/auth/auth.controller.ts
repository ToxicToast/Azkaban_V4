import { Controller, Logger } from '@nestjs/common';
import { AzkabanAuthTopics, ControllerHelper } from '@azkaban/shared';
import { AuthService } from './auth.service';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCreateDTO, UserLoginDTO } from '../../utils';
import { UserDAO } from '@azkaban/azkaban-infrastructure';

@Controller(ControllerHelper('auth'))
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Span(AzkabanAuthTopics.LOGIN + '.service')
	@MessagePattern(AzkabanAuthTopics.LOGIN)
	async login(@Payload() payload: UserLoginDTO) {
		Logger.log('Login User', payload);
		return this.service.authLogin(payload.data).then((data: UserDAO) => {
			return {
				...data,
				activated_at: undefined,
				loggedin_at: undefined,
				created_at: undefined,
				updated_at: undefined,
				deleted_at: undefined,
				password: undefined,
				salt: undefined,
			};
		});
	}

	@Span(AzkabanAuthTopics.REGISTER + '.service')
	@MessagePattern(AzkabanAuthTopics.REGISTER)
	async register(@Payload() payload: Omit<UserCreateDTO, 'salt'>) {
		Logger.log('Register User', { payload });
		return await this.service.authRegister(payload.data);
	}
}
