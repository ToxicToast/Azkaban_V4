import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { ApiService } from '../../api/api.service';
import { CronjobService } from '../cronjob.service';
import { Logger } from '@nestjs/common';
import { Span } from 'nestjs-otel';
import { Job } from 'bullmq';
import { Origins } from 'blizzard.js/dist/endpoints';
import { CharacterModel } from './character.model';
import { Nullable } from '@azkaban/shared';

@Processor('warcraft-character')
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
			Logger.log('onGetCharacterFromApi', { region, realm, name, guild });
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
			Logger.log('onCharacterUpdate', { id, old_guild, data });
			const updatePayload = {
				display_realm: data.realm.name,
				display_name: data.name,
				gender: data.gender.name,
				faction: data.faction.name,
				race: data.race.name,
				class: data.character_class.name,
				spec: data.active_spec.name,
				level: data.level,
				item_level: data.equipped_item_level,
				guild: data.guild.name,
				loggedin_at:
					data.last_login_timestamp !== null
						? new Date(data.last_login_timestamp)
						: null,
				old_guild:
					data.guild.name !== old_guild ? old_guild : undefined,
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
			Logger.log('Job completed', job.id, job.returnvalue);
			return await this.onCharacterUpdate(
				job.data.id,
				job.data.guild,
				job.returnvalue,
			);
		} catch (error) {
			Logger.error(error);
		}
	}
}
