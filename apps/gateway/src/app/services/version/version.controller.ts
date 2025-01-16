import { Controller, Get } from '@nestjs/common';
import { VersionRoutes } from '@azkaban/shared';
import { VersionService } from './version.service';

@Controller({
	path: VersionRoutes.CONTROLLER,
	version: '1',
})
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@Get()
	async getVersions(): Promise<unknown> {
		return await this.service.generateVersions();
	}
}
