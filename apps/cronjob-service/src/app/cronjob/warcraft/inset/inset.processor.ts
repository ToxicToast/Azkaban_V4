import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { InsetService } from './inset.service';
import { Logger } from '@nestjs/common';
import { Nullable } from '@azkaban/shared';
import { Job } from 'bullmq';
import { ApiInsetModel } from '../models';

@Processor('blizzard-inset')
export class InsetProcessor extends WorkerHost {
	constructor(private readonly service: InsetService) {
		super();
	}

	private async onGetInsetFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<Nullable<ApiInsetModel>> {
		try {
			const { region, realm, name } = data;
			return await this.service.getInsetFromApi(region, realm, name);
		} catch (error) {
			Logger.error(error, 'onGetInsetFromApi');
			return null;
		}
	}

	private async onInsetUpdate(
		id: string,
		data: ApiInsetModel,
	): Promise<Nullable<ApiInsetModel>> {
		try {
			if (data) {
				await this.service.updateCharacter(id, data);
				await this.service.restoreCharacter(id);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error(error, 'onInsetUpdate');
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<ApiInsetModel>,
			string
		>,
	): Promise<Nullable<ApiInsetModel>> {
		return await this.onGetInsetFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<Nullable<{ id: string }>, Nullable<ApiInsetModel>, string>,
	): Promise<void> {
		try {
			const { id } = job.data;
			const data = job.returnvalue;
			if (data) {
				await this.onInsetUpdate(id, data);
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
