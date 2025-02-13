import { Injectable } from '@nestjs/common';
import { ForgetPasswordDTO, LoginDTO, RegisterDTO } from './dto';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { CommandBus } from '@nestjs/cqrs';
import {
	ForgetPasswordCommand,
	LoginCommand,
	RegisterCommand,
} from './commands';

@Injectable()
export class AuthService {
	constructor(private readonly commandBus: CommandBus) {}

	async login(data: LoginDTO): Promise<LoginDAO> {
		return await this.commandBus.execute(
			new LoginCommand(data.username, data.password),
		);
	}

	async register(data: RegisterDTO): Promise<RegisterDAO> {
		return await this.commandBus.execute(
			new RegisterCommand(data.email, data.username, data.password),
		);
	}

	async forgetPassword(data: ForgetPasswordDTO): Promise<ForgetPasswordDAO> {
		return await this.commandBus.execute(
			new ForgetPasswordCommand(data.email, data.username),
		);
	}
}
