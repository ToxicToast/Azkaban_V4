import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CallbackRoutes } from '@azkaban/shared';

@Controller({
	path: CallbackRoutes.CONTROLLER,
	version: '1',
})
export class CallbackController {
	@Post()
	async callback(@Body() data: unknown): Promise<void> {
		Logger.debug(data, CallbackController.name);
	}
}
