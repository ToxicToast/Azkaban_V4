import { Injectable } from '@nestjs/common';
import { CharacterResponse, CharactersResponse } from './character.model';
import { Optional } from '@azkaban/shared';
import { CharacterPresenter } from './character.presenter';

@Injectable()
export class CharacterService {
	async characterList(): Promise<CharactersResponse> {
		const characters = [];
		return characters.map((character: unknown) => {
			const presenter = new CharacterPresenter(character);
			return presenter.transform();
		});
	}

	async characterById(id: string): Promise<CharacterResponse> {
		const user = null;
		if (user !== null) {
			const presenter = new CharacterPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async characterCreate(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterResponse> {
		const user = null;
		if (user !== null) {
			const presenter = new CharacterPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async characterUpdate(
		id: string,
		region?: Optional<string>,
		realm?: Optional<string>,
		name?: Optional<string>,
		gender_id?: Optional<number>,
		faction_id?: Optional<number>,
		race_id?: Optional<number>,
		class_id?: Optional<number>,
		spec_id?: Optional<number>,
		level?: Optional<number>,
		item_level?: Optional<number>,
		guild_id?: Optional<number>,
		mythic?: Optional<number>,
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
		if (mythic !== undefined) {
			changeData['mythic'] = mythic;
		}
		const user = null;
		if (user !== null) {
			const presenter = new CharacterPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async deleteCharacter(id: string): Promise<CharacterResponse> {
		const user = null;
		if (user !== null) {
			const presenter = new CharacterPresenter(user);
			return presenter.transform();
		}
		return null;
	}

	async restoreCharacter(id: string): Promise<CharacterResponse> {
		const user = null;
		if (user !== null) {
			const presenter = new CharacterPresenter(user);
			return presenter.transform();
		}
		return null;
	}
}
