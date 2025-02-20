import { Injectable } from '@nestjs/common';
import { ForgetPasswordDTO, LoginDTO, RegisterDTO } from './dto';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
	ForgetPasswordCommand,
	LoginCommand,
	RegisterCommand,
} from './commands';
import { ProfileQuery } from './queries';

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	async login(data: LoginDTO): Promise<LoginDAO> {
		return await this.commandBus.execute(
			new LoginCommand(data.email, data.password),
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

	async profile(token: string): Promise<unknown> {
		return await this.queryBus.execute(new ProfileQuery(token));
	}
}
