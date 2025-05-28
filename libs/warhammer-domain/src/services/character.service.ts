import { CharacterAnemic } from '../anemics';
import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { DomainEvent, Nullable, Optional, Result } from '@azkaban/shared';
import { CharacterData, UpdateCharacterData } from '../data';

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
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findById(id, withDeleted);
			if (result !== null) {
				return Result.ok<CharacterAnemic>(result);
			}
			return Result.fail<CharacterAnemic>('Character not found', 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharacterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.repository.findByCharacterId(
				character_id,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<CharacterAnemic>(result);
			}
			return Result.fail<CharacterAnemic>('Character not found', 404);
		} catch (error) {
			return Result.fail<CharacterAnemic>(error, 500);
		}
	}

	async getCharactersByUserId(
		user_id?: Optional<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<CharacterAnemic>>> {
		try {
			const result = await this.repository.findByUserId(
				user_id,
				withDeleted,
			);
			return Result.ok<Array<CharacterAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<CharacterAnemic>>(error, 500);
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
				const { fate, wounds, corruption, total_fate, total_wounds } =
					data;
				if (fate !== undefined) {
					aggregate.changeFate(fate.fate, fate.type);
				}
				if (wounds !== undefined) {
					aggregate.changeWounds(wounds.wounds, wounds.type);
				}
				if (corruption !== undefined) {
					aggregate.changeCorruption(
						corruption.corruption,
						corruption.type,
					);
				}
				if (total_fate !== undefined) {
					aggregate.changeTotalFate(total_fate);
				}
				if (total_wounds !== undefined) {
					aggregate.changeTotalWounds(total_wounds);
				}
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

	async assignCharacter(
		id: number,
		user_id: Nullable<string>,
	): Promise<Result<CharacterAnemic>> {
		try {
			const result = await this.getCharacterById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.changeUser(user_id);
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
