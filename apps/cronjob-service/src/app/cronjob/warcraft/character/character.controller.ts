import { Controller } from '@nestjs/common';
import { CharacterCron } from './character.cron';
import { MessagePattern } from '@nestjs/microservices';
import { AzkabanCronjobTopics } from '@azkaban/shared';

@Controller()
export class CharacterController {
	constructor(private readonly cronjob: CharacterCron) {}

	@MessagePattern(AzkabanCronjobTopics.WARCRAFT_CHARACTER)
	async handleCharacterCronjob(): Promise<void> {
		await this.cronjob.runQueue();
	}
}
