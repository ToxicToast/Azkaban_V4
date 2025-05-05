import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ApiService } from '../../api/api.service';
import { CronjobService } from '../cronjob.service';
import { Logger } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import { Job } from 'bullmq';
import { Origins } from 'blizzard.js/dist/endpoints';
import { CharacterModel } from './character.model';
import { Nullable } from '@azkaban/shared';
import { characterQueue } from './character.queue';

@Processor(characterQueue)
export class CharacterProcessor extends WorkerHost {
	constructor(
		private readonly apiService: ApiService,
		private readonly service: CronjobService,
	) {
		super();
	}

	@Span('onGetCharacterFromApi')
	private async onGetCharacterFromApi(data: {
		id: number;
		region: string;
		realm: string;
		name: string;
		guild: Nullable<string>;
	}) {
		try {
			const { region, realm, name, guild } = data;
			await this.apiService.setApiClient(region as Origins);
			return await this.apiService.getCharacter({ realm, name });
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}

	@Span('onCharacterUpdate')
	private async onCharacterUpdate(
		id: number,
		old_guild: Nullable<string>,
		data: CharacterModel,
	) {
		try {
			const currentGuild = data.guild?.name ?? null;
			const updatePayload = {
				display_realm: data.realm?.name ?? undefined,
				display_name: data?.name ?? undefined,
				gender: data.gender?.name ?? undefined,
				faction: data.faction?.name ?? undefined,
				race: data.race?.name ?? undefined,
				class: data.character_class?.name ?? undefined,
				spec: data.active_spec?.name ?? undefined,
				level: data.level,
				item_level: data.equipped_item_level,
				guild: currentGuild,
				loggedin_at:
					data.last_login_timestamp !== null
						? new Date(data.last_login_timestamp)
						: null,
				old_guild: currentGuild !== old_guild ? old_guild : undefined,
				rank: currentGuild === null ? null : undefined,
			};
			return await this.service.updateCharacter(id, updatePayload);
		} catch (error) {
			Logger.error(error);
			throw error;
		}
	}

	@Span('process')
	async process(
		job: Job<
			{
				id: number;
				region: string;
				realm: string;
				name: string;
				guild: Nullable<string>;
			},
			unknown,
			string
		>,
	) {
		Logger.log('Processing Character', job.name, job.data);
		return await this.onGetCharacterFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<
			{
				id: number;
				region: string;
				realm: string;
				name: string;
				guild: Nullable<string>;
			},
			CharacterModel,
			string
		>,
	) {
		try {
			Logger.log('Job completed', job.id, job.returnvalue, job.data);
			await this.service.restoreCharacter(job.data.id);
			return await this.onCharacterUpdate(
				job.data.id,
				job.data.guild,
				job.returnvalue,
			);
		} catch (error) {
			Logger.error(error);
			return await this.service.deleteCharacter(job.data.id);
		}
	}
}
