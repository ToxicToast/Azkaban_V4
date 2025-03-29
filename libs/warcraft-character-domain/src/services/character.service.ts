import { CharacterAnemic } from '../anemics';
import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { CharacterData } from '../data';
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

	async getCharacters(): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findList();
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharacterById(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findById(id);
			return Result.ok<CharacterAnemic>(result);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
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
			if (result === null) {
				return Result.fail<CharacterAnemic>(result, 404);
			}
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
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async updateCharacter(
		id: string,
		gender_id?: Optional<Nullable<string>>,
		faction_id?: Optional<Nullable<string>>,
		race_id?: Optional<Nullable<string>>,
		class_id?: Optional<Nullable<string>>,
		spec_id?: Optional<Nullable<string>>,
		level?: Optional<Nullable<number>>,
		item_level?: Optional<Nullable<number>>,
		guild_id?: Optional<Nullable<string>>,
		rank_id?: Optional<Nullable<number>>,
		display_realm?: Optional<Nullable<string>>,
		display_name?: Optional<Nullable<string>>,
		inset?: Optional<Nullable<string>>,
		loggedin_at?: Optional<Nullable<Date>>,
		mythic?: Optional<number>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				if (gender_id !== undefined) {
					aggregate.changeGender(gender_id);
				}
				if (faction_id !== undefined) {
					aggregate.changeFaction(faction_id);
				}
				if (race_id !== undefined) {
					aggregate.changeRace(race_id);
				}
				if (class_id !== undefined) {
					aggregate.changeClass(class_id);
				}
				if (spec_id !== undefined) {
					aggregate.changeSpec(spec_id);
				}
				if (level !== undefined) {
					aggregate.changeLevel(level);
				}
				if (item_level !== undefined) {
					aggregate.changeItemLevel(item_level);
				}
				if (guild_id !== undefined) {
					aggregate.changeGuild(guild_id);
				}
				if (rank_id !== undefined) {
					aggregate.changeRank(rank_id);
				}
				if (display_realm !== undefined) {
					aggregate.changeDisplayRealm(display_realm);
				}
				if (display_name !== undefined) {
					aggregate.changeDisplayName(display_name);
				}
				if (inset !== undefined) {
					aggregate.changeInset(inset);
				}
				if (loggedin_at !== undefined) {
					aggregate.changeLoggedIn(loggedin_at);
				}
				if (mythic !== undefined) {
					aggregate.changeMythic(mythic);
				}
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async deleteCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteCharacter();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async restoreCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreCharacter();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async activateCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateCharacter();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async deactivateCharacter(id: string): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateCharacter();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<CharacterAnemic>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}
}
