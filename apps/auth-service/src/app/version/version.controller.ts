import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanAuthTopics, VersionRoutes } from '@azkaban/shared';
import { VersionService } from './version.service';

@Controller(VersionRoutes.CONTROLLER)
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@MessagePattern(AzkabanAuthTopics.VERSION)
	version(): string {
		return this.service.appVersion();
	}
}
