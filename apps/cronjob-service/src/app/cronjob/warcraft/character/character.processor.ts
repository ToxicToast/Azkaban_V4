import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { CharacterService } from './character.service';
import { Logger } from '@nestjs/common';
import { Nullable } from '@azkaban/shared';
import { Job } from 'bullmq';
import { ApiCharacterModel } from '../models';

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
	}): Promise<Nullable<ApiCharacterModel>> {
		try {
			const { region, realm, name } = data;
			return await this.service.getCharacterFromApi(region, realm, name);
		} catch (error) {
			Logger.error(error, 'onGetCharacterFromApi');
			return null;
		}
	}

	private async onCharacterUpdate(
		id: string,
		data: ApiCharacterModel,
	): Promise<Nullable<ApiCharacterModel>> {
		try {
			if (data) {
				await this.service.updateCharacter(id, data);
				await this.service.restoreCharacter(id);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error(error, 'onCharacterUpdate');
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<ApiCharacterModel>,
			string
		>,
	): Promise<Nullable<ApiCharacterModel>> {
		return await this.onGetCharacterFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<Nullable<{ id: string }>, Nullable<ApiCharacterModel>, string>,
	): Promise<void> {
		try {
			const { id } = job.data;
			const data = job.returnvalue;
			if (data) {
				await this.onCharacterUpdate(id, data);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error(error, 'onCompleted');
			const { id } = job.data;
			await this.service.deleteCharacter(id);
		}
	}
}
