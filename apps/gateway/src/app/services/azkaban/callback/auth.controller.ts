import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CallbackRoutes } from '@azkaban/shared';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from './commands';
import { LoginDTO } from './dto';

@Controller({
	path: CallbackRoutes.AUTHCONTROLLER,
	version: '1',
})
export class AuthCallbackController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post(CallbackRoutes.LOGIN)
	async loginCallback(@Body() data: LoginDTO): Promise<void> {
		await this.commandBus.execute(new LoginCommand(data));
	}

	@Post(CallbackRoutes.REGISTER)
	async registerCallback(@Body() data: unknown): Promise<void> {
		Logger.debug(data, AuthCallbackController.name);
	}
}
