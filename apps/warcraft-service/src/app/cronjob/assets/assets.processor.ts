import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ApiService } from '../../api/api.service';
import { CronjobService } from '../cronjob.service';
import { Span } from 'nestjs-otel';
import { Logger } from '@nestjs/common';
import { Origins } from 'blizzard.js/dist/endpoints';
import { Job } from 'bullmq';
import { AssetsModel } from './assets.model';

@Processor('warcraft-assets')
export class AssetsProcessor extends WorkerHost {
	constructor(
		private readonly apiService: ApiService,
		private readonly service: CronjobService,
	) {
		super();
	}

	@Span('onGetAssetsFromApi')
	private async onGetAssetsFromApi(data: {
		id: number;
		region: string;
		realm: string;
		name: string;
	}) {
		try {
			const { region, realm, name } = data;
			Logger.log('onGetAssetsFromApi', { region, realm, name });
			await this.apiService.setApiClient(region as Origins);
			return await this.apiService.getCharacterAssets({
				realm,
				name,
			});
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}

	@Span('onCharacterUpdate')
	private async onCharacterUpdate(id: number, data: AssetsModel) {
		try {
			Logger.log('onCharacterUpdate', { id, data });
			const avatar = data.assets.find((asset) => asset.key === 'avatar');
			const inset = data.assets.find((asset) => asset.key === 'inset');
			const updatePayload = {
				avatar: avatar?.value ?? null,
				inset: inset?.value ?? null,
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
		Logger.log('Processing Assets', job.name, job.data);
		return await this.onGetAssetsFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<
			{ id: number; region: string; realm: string; name: string },
			AssetsModel,
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
