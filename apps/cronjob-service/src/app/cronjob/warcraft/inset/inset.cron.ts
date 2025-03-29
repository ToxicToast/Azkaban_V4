import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DatabaseCharactersService } from '../services/character.service';

@Injectable()
export class InsetCron {
	constructor(
		private readonly service: DatabaseCharactersService,
		@InjectQueue('blizzard-inset') private readonly queue: Queue,
	) {}

	async runQueue(): Promise<void> {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			if (character.deleted_at === null) {
				await this.queue.add('blizzard-inset', {
					id: character.id,
					region: character.region,
					realm: character.realm,
					name: character.name,
				});
			}
		}
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Update WoW Insets',
	})
	async updateInsets(): Promise<void> {
		await this.runQueue();
	}
}
