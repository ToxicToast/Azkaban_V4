import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { CharacterAnemic } from '../anemics';
import { CharacterData, UpdateCharacterData } from '../data';
import { DomainEvent, Nullable, Optional, Result } from '@azkaban/shared';

export class CharacterService {
	private readonly factory: CharacterFactory = new CharacterFactory();

	constructor(private readonly repository: CharacterRepository) {}

	private async save(
		anemic: CharacterAnemic,
		events: Array<DomainEvent>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<CharacterAnemic>(result, events);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharacters(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findList(
				limit,
				offset,
				withDeleted,
			);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CharacterAnemic>>> {
		try {
			const result = await this.repository.findById(id, withDeleted);
			if (result !== null) {
				return Result.ok<Nullable<CharacterAnemic>>(result);
			}
			return Result.fail<Nullable<CharacterAnemic>>(
				'Character not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByCharacterId(
				character_id,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<CharacterAnemic>>(result);
			}
			return Result.fail<Nullable<CharacterAnemic>>(
				'Character not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByGuild(
		guild: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByGuild(
				guild,
				withDeleted,
			);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByClass(
		character_class: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByClass(
				character_class,
				withDeleted,
			);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByRace(
		race: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByRace(race, withDeleted);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByFaction(
		faction: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByFaction(
				faction,
				withDeleted,
			);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByRegionRealmName(
				region,
				realm,
				name,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<CharacterAnemic>>(result);
			}
			return Result.fail<Nullable<CharacterAnemic>>(
				'Character not found',
				404,
			);
		} catch (error) {
			return Result.fail<Nullable<CharacterAnemic>>(error, 500);
		}
	}

	async createCharacter(
		data: CharacterData,
	): Promise<Result<CharacterAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			const anemic = aggregate.toAnemic();
			const character = anemic.character;
			const events = anemic.events;
			return await this.save(character, events);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async updateCharacter(
		data: UpdateCharacterData,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(data.id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				const {
					display_realm,
					display_name,
					gender,
					faction,
					race,
					class: character_class,
					spec,
					level,
					item_level,
					guild,
					rank,
					inset,
					avatar,
					mythic,
					raid,
					loggedin_at,
				} = data;
				if (display_realm !== undefined) {
					aggregate.changeDisplayRealm(display_realm);
				}
				if (display_name !== undefined) {
					aggregate.changeDisplayName(display_name);
				}
				if (gender !== undefined) {
					aggregate.changeGender(gender);
				}
				if (faction !== undefined) {
					aggregate.changeFaction(faction);
				}
				if (race !== undefined) {
					aggregate.changeRace(race);
				}
				if (character_class !== undefined) {
					aggregate.changeClass(character_class);
				}
				if (spec !== undefined) {
					aggregate.changeSpec(spec);
				}
				if (level !== undefined) {
					aggregate.changeLevel(level);
				}
				if (item_level !== undefined) {
					aggregate.changeItemLevel(item_level);
				}
				if (guild !== undefined) {
					aggregate.changeGuild(guild);
				}
				if (rank !== undefined) {
					aggregate.changeRank(rank);
				}
				if (inset !== undefined) {
					aggregate.changeInset(inset);
				}
				if (avatar !== undefined) {
					aggregate.changeAvatar(avatar);
				}
				if (mythic !== undefined) {
					aggregate.changeMythic(mythic);
				}
				if (raid !== undefined) {
					aggregate.changeRaid(raid);
				}
				if (loggedin_at !== undefined) {
					aggregate.changeLoggedIn(loggedin_at);
				}
				const anemic = aggregate.toAnemic();
				const character = anemic.character;
				const events = anemic.events;
				return await this.save(character, events);
			} else {
				return Result.fail<CharacterAnemic>(result.errorValue, 404);
			}
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async deleteCharacter(id: number): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteCharacter();
				const anemic = aggregate.toAnemic();
				const character = anemic.character;
				const events = anemic.events;
				return await this.save(character, events);
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async restoreCharacter(id: number): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreCharacter();
				const anemic = aggregate.toAnemic();
				const character = anemic.character;
				const events = anemic.events;
				return await this.save(character, events);
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async activateCharacter(id: number): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateCharacter();
				const anemic = aggregate.toAnemic();
				const character = anemic.character;
				const events = anemic.events;
				return await this.save(character, events);
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async deactivateCharacter(id: number): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateCharacter();
				const anemic = aggregate.toAnemic();
				const character = anemic.character;
				const events = anemic.events;
				return await this.save(character, events);
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}
}
