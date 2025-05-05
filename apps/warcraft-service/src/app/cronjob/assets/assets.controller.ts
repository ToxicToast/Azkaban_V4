import { Controller, Get } from '@nestjs/common';
import { AssetsCron } from './assets.cron';
import { ControllerHelper } from '@azkaban/shared';

@Controller(ControllerHelper('cronjob/assets'))
export class CronjobAssetsController {
	constructor(private readonly cron: AssetsCron) {}

	@Get('/')
	async triggerCronjob() {
		return await this.cron.runQueue();
	}
}
