import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ApiService } from '../../api/api.service';
import { CronjobService } from '../cronjob.service';
import { Span } from 'nestjs-otel';
import { Logger } from '@nestjs/common';
import { Origins } from 'blizzard.js/dist/endpoints';
import { Job } from 'bullmq';
import { MythicModel } from './mythic.model';

@Processor('warcraft-mythic')
export class MythicProcessor extends WorkerHost {
	constructor(
		private readonly apiService: ApiService,
		private readonly service: CronjobService,
	) {
		super();
	}

	@Span('onGetMythicFromApi')
	private async onGetMythicFromApi(data: {
		id: number;
		region: string;
		realm: string;
		name: string;
	}) {
		try {
			const { region, realm, name } = data;
			Logger.log('onGetMythicFromApi', { region, realm, name });
			await this.apiService.setApiClient(region as Origins);
			return await this.apiService.getMythicRating({
				realm,
				name,
			});
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}

	@Span('onCharacterUpdate')
	private async onCharacterUpdate(id: number, data: MythicModel) {
		try {
			Logger.log('onCharacterUpdate', { id, data });
			const rating = data?.current_mythic_rating?.rating ?? '0';
			const numberRating = Number(rating);
			const updatePayload = {
				mythic: Math.ceil(numberRating),
			};
			Logger.log('updatePayload', updatePayload);
			return await this.service.updateCharacter(id, updatePayload);
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}

	@Span('process')
	async process(
		job: Job<
			{ id: number; region: string; realm: string; name: string },
			unknown,
			string
		>,
	) {
		Logger.log('Processing Mythic', job.name, job.data);
		return await this.onGetMythicFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<
			{ id: number; region: string; realm: string; name: string },
			MythicModel,
			string
		>,
	) {
		try {
			Logger.log('Job completed', job.id, job.returnvalue);
			return await this.onCharacterUpdate(job.data.id, job.returnvalue);
		} catch (error) {
			Logger.error(error);
			return await this.service.deleteCharacter(job.data.id);
		}
	}
}
