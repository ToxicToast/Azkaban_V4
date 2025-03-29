import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanCronjobTopics, WarcraftRoutes } from '@azkaban/shared';
import { MythicCron } from './mythic.cron';

@Controller(WarcraftRoutes.MYTHIC)
export class MythicController {
	constructor(private readonly cronjob: MythicCron) {}

	@MessagePattern(AzkabanCronjobTopics.WARCRAFT_MYTHIC)
	async handleMythicCronjob(): Promise<void> {
		await this.cronjob.runQueue();
	}

	@Get()
	async getMythicCronjob(): Promise<void> {
		return await this.cronjob.runQueue();
	}
}
