import { Controller, Get } from '@nestjs/common';
import { ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { VersionService } from './version.service';

@Controller(ControllerHelper('version'))
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@Span('dementor.version')
	@Get('/')
	async getVersions() {
		return await this.service.getVersions();
	}
}
