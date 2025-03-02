import { Controller, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TwitchRoutes } from '@azkaban/shared';
import { BotService } from './bot.service';
import { SSEService } from './sse.service';
import { ViewerService } from './viewer.service';
import { MessageService } from './message.service';

@Controller({
	path: TwitchRoutes.BOTCONTROLLER,
	version: '1',
})
export class BotController implements OnModuleInit, OnModuleDestroy {
	constructor(
		private readonly service: BotService,
		private readonly sse: SSEService,
		private readonly viewer: ViewerService,
		private readonly messages: MessageService,
	) {}

	async onModuleInit(): Promise<void> {
		this.sse.initEvents();
		this.viewer.initEvents();
		this.messages.initEvents();
		//
		this.service.startBot();
	}

	async onModuleDestroy(): Promise<void> {
		this.service.stopBot();
	}
}
