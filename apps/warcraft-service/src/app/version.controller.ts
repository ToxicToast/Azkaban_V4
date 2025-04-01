import { Controller } from '@nestjs/common';
import { VersionService, WarcraftTopics } from '@azkaban/shared';
import { MessagePattern } from '@nestjs/microservices';
import { Span } from 'nestjs-otel';

@Controller()
export class VersionController {
	constructor(private readonly versionService: VersionService) {}

	@Span(WarcraftTopics.VERSION)
	@MessagePattern(WarcraftTopics.VERSION)
	getVersion(): string {
		return this.versionService.appVersion();
	}
}
