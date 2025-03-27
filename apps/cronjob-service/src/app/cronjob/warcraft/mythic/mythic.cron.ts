import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DatabaseCharactersService } from '../services/character.service';

@Injectable()
export class MythicCron {
	constructor(
		private readonly service: DatabaseCharactersService,
		@InjectQueue('blizzard-mythic') private readonly queue: Queue,
	) {}

	async runQueue(): Promise<void> {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			if (character.deleted_at === null) {
				await this.queue.add('blizzard-mythic', {
					id: character.id,
					region: character.region,
					realm: character.realm,
					name: character.name,
				});
			}
		}
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Update WoW Characters Rating',
	})
	async updateCharacters(): Promise<void> {
		await this.runQueue();
	}
}
