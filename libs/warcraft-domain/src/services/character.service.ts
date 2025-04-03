import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { CharacterAnemic } from '../anemics';
import { CharacterData, UpdataCharacterData } from '../data';
import { Nullable, Optional, Result } from '@azkaban/shared';

export class CharacterService {
	private readonly factory: CharacterFactory = new CharacterFactory();

	constructor(private readonly repository: CharacterRepository) {}

	private async save(
		anemic: CharacterAnemic,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharacters(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findList(limit, offset);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterById(id: number): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findById(id);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharacterByCharacterId(
		character_id: string,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result =
				await this.repository.findByCharacterId(character_id);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharactersByGuild(
		guild: Nullable<string>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByGuild(guild);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByClass(
		character_class: Nullable<string>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByClass(character_class);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByRace(
		race: Nullable<string>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByRace(race);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByFaction(
		faction: Nullable<string>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByFaction(faction);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findByRegionRealmName(
				region,
				realm,
				name,
			);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async createCharacter(
		data: CharacterData,
	): Promise<Result<CharacterAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			const character = aggregate.toAnemic().character;
			return await this.save(character);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async updateCharacter(
		data: UpdataCharacterData,
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
				const character = aggregate.toAnemic().character;
				return await this.save(character);
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
				const character = aggregate.toAnemic().character;
				return await this.save(character);
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
				const character = aggregate.toAnemic().character;
				return await this.save(character);
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
				const character = aggregate.toAnemic().character;
				return await this.save(character);
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
				const character = aggregate.toAnemic().character;
				return await this.save(character);
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}
}
