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
			const { region, realm, name } = data;
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
			return { character, inset };
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
