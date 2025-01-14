import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthTopics, VersionRoutes } from '@azkaban/shared';
import { VersionService } from './version.service';

@Controller(VersionRoutes.CONTROLLER)
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@MessagePattern(AuthTopics.VERSION)
	version(): string {
		return this.service.appVersion();
	}
}
