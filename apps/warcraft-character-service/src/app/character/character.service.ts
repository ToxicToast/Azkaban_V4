import { Inject, Injectable, Logger } from '@nestjs/common';
import { CharacterResponse, CharactersResponse } from './character.model';
import { Nullable, Optional } from '@azkaban/shared';
import { CharacterPresenter } from './character.presenter';
import { Repository } from 'typeorm';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-character-infrastructure';

@Injectable()
export class CharacterService {
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

	async characterList(): Promise<CharactersResponse> {
		const characters = await this.infrastructureService.getCharacterList();
		return characters.map((character: CharacterDAO) => {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		});
	}

	async characterById(id: string): Promise<CharacterResponse> {
		const character = await this.infrastructureService.getCharacterById(id);
		if (character !== null) {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		}
		return null;
	}

	async characterCreate(
		region: string,
		realm: string,
		name: string,
		rank_id?: Optional<number>,
	): Promise<CharacterResponse> {
		const character = await this.infrastructureService.createCharacter({
			region,
			realm,
			name,
			rank_id,
		});
		if (character !== null) {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		}
		return null;
	}

	async characterUpdate(
		id: string,
		region?: Optional<string>,
		realm?: Optional<string>,
		name?: Optional<string>,
		gender_id?: Optional<string>,
		faction_id?: Optional<string>,
		race_id?: Optional<string>,
		class_id?: Optional<string>,
		spec_id?: Optional<string>,
		level?: Optional<number>,
		item_level?: Optional<number>,
		guild_id?: Optional<string>,
		rank_id?: Optional<number>,
		mythic?: Optional<number>,
		display_realm?: Optional<Nullable<string>>,
		display_name?: Optional<Nullable<string>>,
		inset?: Optional<Nullable<string>>,
	): Promise<CharacterResponse> {
		const changeData = {};
		if (region !== undefined) {
			changeData['region'] = region;
		}
		if (realm !== undefined) {
			changeData['realm'] = realm;
		}
		if (name !== undefined) {
			changeData['name'] = name;
		}
		if (gender_id !== undefined) {
			changeData['gender_id'] = gender_id;
		}
		if (faction_id !== undefined) {
			changeData['faction_id'] = faction_id;
		}
		if (race_id !== undefined) {
			changeData['race_id'] = race_id;
		}
		if (class_id !== undefined) {
			changeData['class_id'] = class_id;
		}
		if (spec_id !== undefined) {
			changeData['spec_id'] = spec_id;
		}
		if (level !== undefined) {
			changeData['level'] = level;
		}
		if (item_level !== undefined) {
			changeData['item_level'] = item_level;
		}
		if (guild_id !== undefined) {
			changeData['guild_id'] = guild_id;
		}
		if (rank_id !== undefined) {
			changeData['rank_id'] = rank_id;
		}
		if (mythic !== undefined) {
			changeData['mythic'] = mythic;
		}
		if (display_realm !== undefined) {
			changeData['display_realm'] = display_realm;
		}
		if (display_name !== undefined) {
			changeData['display_name'] = display_name;
		}
		if (inset !== undefined) {
			changeData['inset'] = inset;
		}
		const character = await this.infrastructureService.updateCharacter(
			id,
			changeData,
		);
		if (character !== null) {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		}
		return null;
	}

	async deleteCharacter(id: string): Promise<CharacterResponse> {
		const character = null;
		if (character !== null) {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		}
		return null;
	}

	async restoreCharacter(id: string): Promise<CharacterResponse> {
		const character = await this.infrastructureService.restoreCharacter(id);
		if (character !== null) {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		}
		return null;
	}
}
