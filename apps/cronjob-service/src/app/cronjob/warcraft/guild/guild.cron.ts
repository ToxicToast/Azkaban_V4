import { Injectable, Logger } from '@nestjs/common';
import { GuildService } from './guild.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GuildCron {
	constructor(
		private readonly service: GuildService,
		@InjectQueue('blizzard-guild') private readonly queue: Queue,
	) {}

	async runQueue(): Promise<void> {
		const guilds = await this.service.getAllGuilds();
		for (const guild of guilds) {
			Logger.debug(guild, GuildCron.name);
			/*if (!guild.isDeleted) {
				await this.queue.add('blizzard-guild', {
					id: guild.id,
					region: guild.region,
					realm: guild.realm,
					name: guild.name,
				});
			}*/
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update WoW Guilds',
	})
	async updateGuilds(): Promise<void> {
		await this.runQueue();
	}
}
