import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CronjobService } from '../cronjob.service';
import { Span } from 'nestjs-otel';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class MythicCron {
	constructor(
		@InjectQueue('warcraft-mythic') private readonly queue: Queue,
		private readonly service: CronjobService,
	) {}

	@Span('runQueue')
	async runQueue() {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			const { id, region, realm, name, deleted_at } = character;
			if (deleted_at === null) {
				Logger.log(`Add ${region}-${realm}-${name} to queue`);
				await this.queue.add('warcraft-mythic', {
					id,
					region,
					realm,
					name,
				});
			}
		}
		return characters;
	}

	@Span('updateMythicCron')
	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update Warcraft Mythic+',
	})
	async updateMythicCron() {
		Logger.log('Running mythic cronjob');
		return await this.runQueue();
	}
}
