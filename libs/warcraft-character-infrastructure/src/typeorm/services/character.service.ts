import { CharacterService as DomainService } from '@azkaban/warcraft-character-domain';
import { CharacterRepository } from '../repositories';
import { CharacterDAO } from '../../dao/character.dao';
import { Nullable, UuidHelper } from '@azkaban/shared';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { CreateCharacterDTO } from '../../dto';

export class CharacterService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: CharacterRepository) {
		this.domainService = new DomainService(this.repository);
	}

	async getCharacterList(): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharacters();
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharacterById(id: string): Promise<Nullable<CharacterDAO>> {
		const result = await this.domainService.getCharacterById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'Character not found',
				raw: result.errorValue,
			});
		}
	}

	async getCharactersByRealm(realm: string): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByRealm(realm);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByRace(race_id: number): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByRace(race_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByClass(class_id: number): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByClass(class_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByFaction(
		faction_id: number,
	): Promise<Array<CharacterDAO>> {
		const result =
			await this.domainService.getCharactersByFaction(faction_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByGuild(guild_id: number): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByGuild(guild_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async createCharacter(data: CreateCharacterDTO): Promise<CharacterDAO> {
		const id = UuidHelper.create().value;
		const result = await this.domainService.createCharacter({
			...data,
			id,
		});
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.BAD_REQUEST,
				message: 'Could not create character',
				raw: result.errorValue,
			});
		}
	}
}
