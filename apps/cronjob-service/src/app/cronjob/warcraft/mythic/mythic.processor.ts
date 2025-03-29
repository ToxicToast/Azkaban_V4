import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { MythicService } from './mythic.service';
import { Logger } from '@nestjs/common';
import { Nullable } from '@azkaban/shared';
import { Job } from 'bullmq';
import { ApiMythicModel } from '../models';
import { DatabaseCharactersService } from '../services/character.service';

@Processor('blizzard-mythic')
export class MythicProcessor extends WorkerHost {
	constructor(
		private readonly service: MythicService,
		private readonly databaseService: DatabaseCharactersService,
	) {
		super();
	}

	private async onGetMythicFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<Nullable<ApiMythicModel>> {
		try {
			const { region, realm, name } = data;
			return await this.service.getMythicFromApi(region, realm, name);
		} catch (error) {
			Logger.error(error, 'onGetMythicFromApi');
			return null;
		}
	}

	private async onCharacterUpdate(
		id: string,
		data: ApiMythicModel,
	): Promise<void> {
		try {
			if (data) {
				await this.databaseService.updateCharacterMythicRating(
					id,
					data,
				);
			}
		} catch (error) {
			Logger.error(error, 'onCharacterUpdate');
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<ApiMythicModel>,
			string
		>,
	): Promise<Nullable<ApiMythicModel>> {
		return await this.onGetMythicFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<Nullable<{ id: string }>, Nullable<ApiMythicModel>, string>,
	): Promise<void> {
		try {
			const { id } = job.data;
			const data = job.returnvalue;
			if (data) {
				await this.onCharacterUpdate(id, data);
			}
		} catch (error) {
			Logger.error(error, 'onCompleted');
		}
	}
}
