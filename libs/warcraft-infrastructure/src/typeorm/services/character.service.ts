import { CharacterService as DomainService } from '@azkaban/warcraft-domain';
import { CharacterRepository } from '../repositories';
import { CharacterDAO } from '../../dao';
import { Nullable, Optional, UuidHelper } from '@azkaban/shared';
import { RpcException } from '@nestjs/microservices';
import { CreateCharacterDTO, UpdateCharacterDTO } from '../../dto';

export class CharacterService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: CharacterRepository) {
		this.domainService = new DomainService(this.repository);
	}

	async getCharacterList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharacters(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { limit, offset },
			});
		}
	}

	async getCharacterById(id: number): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async getCharacterByCharacterId(
		character_id: string,
	): Promise<CharacterDAO> {
		const result =
			await this.domainService.getCharacterByCharacterId(character_id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { character_id },
			});
		}
	}

	async getCharacterByGuild(
		guild: Nullable<string>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByGuild(guild);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { guild },
			});
		}
	}

	async getCharactersByClass(
		character_class: Nullable<string>,
	): Promise<Array<CharacterDAO>> {
		const result =
			await this.domainService.getCharactersByClass(character_class);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { character_class },
			});
		}
	}

	async getCharactersByRace(
		race: Nullable<string>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByRace(race);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { race },
			});
		}
	}

	async getCharactersByFaction(
		faction: Nullable<string>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByFaction(faction);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { faction },
			});
		}
	}

	async getCharacterByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterByRegionRealmName(
			region,
			realm,
			name,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { region, realm, name },
			});
		}
	}

	async createCharacter(data: CreateCharacterDTO): Promise<CharacterDAO> {
		const character_id = UuidHelper.create().value;
		const result = await this.domainService.createCharacter({
			...data,
			character_id,
		});
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { data, character_id },
			});
		}
	}

	async updateCharacter(
		id: number,
		data: UpdateCharacterDTO,
	): Promise<CharacterDAO> {
		const result = await this.domainService.updateCharacter({
			id,
			...data,
		});
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, data },
			});
		}
	}

	async deleteCharacter(id: number): Promise<CharacterDAO> {
		const result = await this.domainService.deleteCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async restoreCharacter(id: number): Promise<CharacterDAO> {
		const result = await this.domainService.restoreCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async activateCharacter(id: number): Promise<CharacterDAO> {
		const result = await this.domainService.activateCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async deactivateCharacter(id: number): Promise<CharacterDAO> {
		const result = await this.domainService.deactivateCharacter(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}
}
