import { Controller, Get } from '@nestjs/common';
import { MythicCron } from './mythic.cron';
import { ControllerHelper } from '@azkaban/shared';

@Controller(ControllerHelper('cronjob/mythic'))
export class CronjobMythicController {
	constructor(private readonly cron: MythicCron) {}

	@Get('/')
	async triggerCronjob() {
		return await this.cron.runQueue();
	}
}
