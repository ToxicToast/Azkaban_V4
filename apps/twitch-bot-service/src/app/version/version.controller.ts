import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TwitchBotTopics, VersionRoutes } from '@azkaban/shared';
import { VersionService } from './version.service';

@Controller({
	path: VersionRoutes.CONTROLLER,
	version: '1',
})
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@MessagePattern(TwitchBotTopics.VERSION)
	version(): string {
		return this.service.appVersion();
	}
}
