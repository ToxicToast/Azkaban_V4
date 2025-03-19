import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CharacterService } from './character.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CharacterCron {
	constructor(
		private readonly service: CharacterService,
		@InjectQueue('blizzard-character') private readonly queue: Queue,
	) {}

	async runQueue(): Promise<void> {
		// const characters = await this.service.getAllCharacters();
		const characters = [];
		for (const character of characters) {
			if (!character.isDeleted) {
				await this.queue.add('blizzard-character', {
					id: character.id,
					region: character.region,
					realm: character.realm,
					name: character.name,
				});
			}
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
		name: 'Update WoW Characters',
	})
	async updateCharacters(): Promise<void> {
		await this.runQueue();
	}
}
