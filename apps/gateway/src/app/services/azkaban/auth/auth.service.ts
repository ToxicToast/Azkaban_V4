import { Injectable } from '@nestjs/common';
import { ForgetPasswordDTO, LoginDTO, RegisterDTO } from './dto';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import {
	ForgetPasswordCommand,
	LoginCommand,
	RegisterCommand,
} from './commands';
import { LoginEvent, RegisterEvent } from './events';

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly eventBus: EventBus,
	) {}

	async login(data: LoginDTO): Promise<LoginDAO> {
		return await this.commandBus
			.execute(new LoginCommand(data.email, data.password))
			.then((res: LoginDAO) => {
				this.eventBus.publish(
					new LoginEvent(res.user.id, res.user.username),
				);
				return res;
			});
	}

	async register(data: RegisterDTO): Promise<RegisterDAO> {
		return await this.commandBus
			.execute(
				new RegisterCommand(data.email, data.username, data.password),
			)
			.then((res: RegisterDAO) => {
				this.eventBus.publish(
					new RegisterEvent(res.user.username, res.user.email),
				);
				return res;
			});
	}

	async forgetPassword(data: ForgetPasswordDTO): Promise<ForgetPasswordDAO> {
		return await this.commandBus.execute(
			new ForgetPasswordCommand(data.email, data.username),
		);
	}
}
