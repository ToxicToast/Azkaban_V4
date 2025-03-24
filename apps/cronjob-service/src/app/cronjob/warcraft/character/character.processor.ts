import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { CharacterService } from './character.service';
import { Logger } from '@nestjs/common';
import { Nullable } from '@azkaban/shared';
import { Job } from 'bullmq';

@Processor('blizzard-character')
export class CharacterProcessor extends WorkerHost {
	constructor(private readonly service: CharacterService) {
		super();
	}

	private async onGetCharacterFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<unknown> {
		try {
			const { id, region, realm, name } = data;
			const character = await this.service.getCharacterFromApi(
				region,
				realm,
				name,
			);
			const inset = await this.service.getInsetFromApi(
				region,
				realm,
				name,
			);
			return { id, character, inset };
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	private async onCharacterUpdate(
		id: string,
		data: unknown,
	): Promise<Nullable<unknown>> {
		try {
			if (data) {
				await this.service.updateCharacter(id, data);
				await this.service.restoreCharacter(id);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<unknown>,
			string
		>,
	): Promise<Nullable<unknown>> {
		return await this.onGetCharacterFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<
			Nullable<{ id: string }>,
			Nullable<{ id: string; character: unknown; inset: unknown }>,
			string
		>,
	): Promise<void> {
		try {
			const { id } = job.data;
			const data = job.returnvalue;
			if (data.character) {
				await this.onCharacterUpdate(id, data.character);
			} else {
				await this.service.deleteCharacter(id);
			}
			Logger.debug(data);
		} catch (error) {
			Logger.error(error);
			const { id } = job.data;
			await this.service.deleteCharacter(id);
		}
	}
}
