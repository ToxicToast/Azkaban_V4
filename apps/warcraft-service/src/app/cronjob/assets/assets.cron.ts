import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CronjobService } from '../cronjob.service';
import { Span } from 'nestjs-otel';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AssetsCron {
	constructor(
		@InjectQueue('warcraft-assets') private readonly queue: Queue,
		private readonly service: CronjobService,
	) {}

	@Span('runQueue')
	async runQueue() {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			const { id, region, realm, name } = character;
			await this.queue.add('warcraft-assets', {
				id,
				region,
				realm,
				name,
			});
		}
	}

	@Span('updateAssetsCron')
	@Cron(CronExpression.EVERY_HOUR)
	async updateAssetsCron() {
		Logger.log('Running assets cronjob');
		await this.runQueue();
	}
}
