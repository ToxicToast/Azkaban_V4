import { Injectable } from '@nestjs/common';
import { VersionService } from './version.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class VersionCron {
	constructor(private readonly service: VersionService) {}

	@Cron(CronExpression.EVERY_10_MINUTES, {
		name: 'Refresh Version Cache',
	})
	async refreshVersionCache(): Promise<void> {
		await this.service.refreshVersion();
	}
}
