import { CharacterAnemic } from '../anemics';
import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { Result } from '@azkaban/shared';

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

	async getCharactersByRealm(
		realm_id: number,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByRealm(realm_id);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByRace(
		race_id: number,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByRace(race_id);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByClass(
		class_id: number,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByClass(class_id);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByFaction(
		faction_id: number,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByFaction(faction_id);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}

	async getCharactersByGuild(
		guild_id: number,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByGuild(guild_id);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
		}
	}
}
