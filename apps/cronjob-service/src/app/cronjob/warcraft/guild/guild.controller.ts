import { Controller } from '@nestjs/common';
import { GuildCron } from './guild.cron';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanCronjobTopics } from '@azkaban/shared';

@Controller()
export class GuildController {
	constructor(private readonly cronjob: GuildCron) {}

	@MessagePattern(AzkabanCronjobTopics.WARCRAFT_GUILD)
	async handleGuildCronjob(): Promise<void> {
		await this.cronjob.runQueue();
	}
}
