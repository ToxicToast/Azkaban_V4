import { CharacterService as DomainService } from '@azkaban/warcraft-character-domain';
import { CharacterRepository } from '../repositories';
import { CharacterDAO } from '../../dao/character.dao';
import { Nullable, UuidHelper } from '@azkaban/shared';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { CreateCharacterDTO, UpdateCharacterDTO } from '../../dto';

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

	async getCharactersByRace(race_id: string): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByRace(race_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByClass(class_id: string): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByClass(class_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByFaction(
		faction_id: string,
	): Promise<Array<CharacterDAO>> {
		const result =
			await this.domainService.getCharactersByFaction(faction_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getCharactersByGuild(guild_id: string): Promise<Array<CharacterDAO>> {
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

	async updateCharacter(
		id: string,
		data: UpdateCharacterDTO,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateCharacter(
			id,
			data.gender_id,
			data.faction_id,
			data.race_id,
			data.class_id,
			data.spec_id,
			data.level,
			data.item_level,
			data.guild_id,
			data.rank_id,
			data.display_realm,
			data.display_name,
			data.inset,
		);
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

	async restoreCharacter(id: string): Promise<CharacterDAO> {
		const result = await this.domainService.restoreCharacter(id);
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
}
