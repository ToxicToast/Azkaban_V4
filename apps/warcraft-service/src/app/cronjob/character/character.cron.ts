import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CronjobService } from '../cronjob.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Span } from 'nestjs-otel';

@Injectable()
export class CharacterCron {
	constructor(
		@InjectQueue('warcraft-character') private readonly queue: Queue,
		private readonly service: CronjobService,
	) {}

	@Span('runQueue')
	async runQueue() {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			const { id, region, realm, name } = character;
			await this.queue.add('warcraft-character', {
				id,
				region,
				realm,
				name,
			});
		}
	}

	@Span('updateCharactersCron')
	@Cron(CronExpression.EVERY_HOUR)
	async updateCharactersCron() {
		Logger.log('Running character cronjob');
		await this.runQueue();
	}
}
