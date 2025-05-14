import { CharacterAnemic } from '../anemics';
import { CharacterFactory } from '../factories';
import { CharacterRepository } from '../repositories';
import { DomainEvent, Optional, Result } from '@azkaban/shared';
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
		limit?: number,
		offset?: number,
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
					current_fate,
					current_fate_type,
					current_wounds,
					current_wounds_type,
					current_corruption,
					current_corruption_type,
				} = data;
				if (
					current_fate !== undefined &&
					current_fate_type !== undefined
				) {
					aggregate.changeFate(current_fate, current_fate_type);
				}
				if (
					current_wounds !== undefined &&
					current_wounds_type !== undefined
				) {
					aggregate.changeWounds(current_wounds, current_wounds_type);
				}
				if (
					current_corruption !== undefined &&
					current_corruption_type !== undefined
				) {
					aggregate.changeCorruption(
						current_corruption,
						current_corruption_type,
					);
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
}
