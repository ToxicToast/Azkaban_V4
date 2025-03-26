import { Inject, Injectable, Logger } from '@nestjs/common';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-character-infrastructure';
import { Repository } from 'typeorm';
import { ApiCharacterModel } from '../models';
import { Nullable } from '@azkaban/shared';

@Injectable()
export class DatabaseCharactersService {
	private readonly infrastructureRepository: CharacterRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterRepository: Repository<CharacterEntity>,
	) {
		this.infrastructureRepository = new CharacterRepository(
			this.characterRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getAllCharacters(): Promise<Array<CharacterDAO>> {
		return await this.infrastructureService.getCharacterList();
	}

	async updateCharacter(
		id: string,
		data: ApiCharacterModel,
	): Promise<Nullable<CharacterDAO>> {
		try {
			const gender_id = data.gender?.name ?? null;
			const faction_id = data.faction?.name ?? null;
			const race_id = data.race.name;
			const class_id = data.character_class.name;
			const spec_id = data.active_spec?.name ?? null;
			const level = data.level;
			const item_level = data.equipped_item_level;
			const guild_id = data.guild?.name ?? null;
			const display_realm = data.realm.name;
			const display_name = data.name;
			const loggedin_at =
				data.last_login_timestamp !== null
					? new Date(data.last_login_timestamp)
					: null;
			return await this.infrastructureService.updateCharacter(id, {
				gender_id,
				faction_id,
				race_id,
				class_id,
				spec_id,
				level,
				item_level,
				guild_id,
				display_realm,
				display_name,
				loggedin_at,
			});
		} catch (error) {
			Logger.error(error, 'updateCharacter');
			return null;
		}
	}

	async deleteCharacter(id: string): Promise<Nullable<CharacterDAO>> {
		try {
			return await this.infrastructureService.deleteCharacter(id);
		} catch (error) {
			Logger.error(error, 'deleteCharacter');
		}
	}

	async activateCharacter(id: string): Promise<Nullable<CharacterDAO>> {
		try {
			return await this.infrastructureService.activateCharacter(id);
		} catch (error) {
			Logger.error(error, 'restoreCharacter');
		}
	}
}
