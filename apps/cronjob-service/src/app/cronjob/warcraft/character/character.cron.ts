import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CharacterService } from './character.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DatabaseCharactersService } from '../services/character.service';

@Injectable()
export class CharacterCron {
	constructor(
		@InjectQueue('blizzard-character') private readonly queue: Queue,
		private readonly service: DatabaseCharactersService,
	) {}

	async runQueue(): Promise<void> {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			if (character.deleted_at === null) {
				await this.queue.add('blizzard-character', {
					id: character.id,
					region: character.region,
					realm: character.realm,
					name: character.name,
				});
			}
		}
	}

	@Cron(CronExpression.EVERY_HOUR, {
		name: 'Update WoW Characters',
	})
	async updateCharacters(): Promise<void> {
		await this.runQueue();
	}
}
