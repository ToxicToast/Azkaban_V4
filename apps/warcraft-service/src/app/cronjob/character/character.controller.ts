import { Controller, Get } from '@nestjs/common';
import { CharacterCron } from './character.cron';
import { ControllerHelper } from '@azkaban/shared';

@Controller(ControllerHelper('cronjob/character'))
export class CronjobCharacterController {
	constructor(private readonly cron: CharacterCron) {}

	@Get('/')
	async triggerCronjob() {
		return await this.cron.runQueue();
	}
}
