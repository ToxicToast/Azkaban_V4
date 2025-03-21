import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { GuildService } from './guild.service';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { Nullable } from '@azkaban/shared';

@Processor('blizzard-guild')
export class GuildProcessor extends WorkerHost {
	constructor(private readonly service: GuildService) {
		super();
	}

	private async onGetGuildFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<unknown> {
		try {
			const { region, realm, name } = data;
			return await this.service.getGuildFromApi(region, realm, name);
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			unknown,
			string
		>,
	): Promise<Nullable<unknown>> {
		return await this.onGetGuildFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<Nullable<unknown>, Nullable<unknown>, string>,
	): Promise<void> {
		try {
			const data = job.returnvalue;
			Logger.debug(data);
		} catch (error) {
			Logger.error(error);
			Logger.debug(job.data);
			// const { id } = job.data;
		}
	}
}
