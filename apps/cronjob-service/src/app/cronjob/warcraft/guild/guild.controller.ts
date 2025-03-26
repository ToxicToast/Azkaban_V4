import { Controller, Get } from '@nestjs/common';
import { GuildCron } from './guild.cron';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanCronjobTopics, WarcraftRoutes } from '@azkaban/shared';

@Controller(WarcraftRoutes.GUILD)
export class GuildController {
	constructor(private readonly cronjob: GuildCron) {}

	@MessagePattern(AzkabanCronjobTopics.WARCRAFT_GUILD)
	async handleGuildCronjob(): Promise<void> {
		await this.cronjob.runQueue();
	}

	@Get()
	async getGuildCronjob(): Promise<void> {
		return await this.cronjob.runQueue();
	}
}
