import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanCronjobTopics, WarcraftRoutes } from '@azkaban/shared';
import { InsetCron } from './inset.cron';

@Controller(WarcraftRoutes.INSET)
export class InsetController {
	constructor(private readonly cronjob: InsetCron) {}

	@MessagePattern(AzkabanCronjobTopics.WARCRAFT_INSET)
	async handleInsetCronjob(): Promise<void> {
		await this.cronjob.runQueue();
	}

	@Get()
	async getInsetCronjob(): Promise<void> {
		return await this.cronjob.runQueue();
	}
}
