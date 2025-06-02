import { CharacterService as DomainService } from '@azkaban/warcraft-domain';
import { CharacterRepository } from '../repositories';
import { CharacterDAO } from '../../dao';
import { Nullable, Optional, UuidHelper } from '@azkaban/shared';
import { RpcException } from '@nestjs/microservices';
import { CreateCharacterDTO, UpdateCharacterDTO } from '../../dto';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class CharacterService {
	private readonly domainService: DomainService;

	constructor(
		private readonly repository: CharacterRepository,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.domainService = new DomainService(this.repository);
	}

	async getCharacterList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharacters(
			limit,
			offset,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { limit, offset, withDeleted },
			});
		}
	}

	async getCharacterById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterById(
			id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, withDeleted },
			});
		}
	}

	async getCharacterByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterByCharacterId(
			character_id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { character_id, withDeleted },
			});
		}
	}

	async getCharacterByGuild(
		guild: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByGuild(
			guild,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { guild, withDeleted },
			});
		}
	}

	async getCharactersByClass(
		character_class: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByClass(
			character_class,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { character_class, withDeleted },
			});
		}
	}

	async getCharactersByRace(
		race: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByRace(
			race,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { race, withDeleted },
			});
		}
	}

	async getCharactersByFaction(
		faction: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CharacterDAO>> {
		const result = await this.domainService.getCharactersByFaction(
			faction,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { faction, withDeleted },
			});
		}
	}

	async getCharacterByRegionRealmName(
		region: string,
		realm: string,
		name: string,
		withDeleted?: Optional<boolean>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.getCharacterByRegionRealmName(
			region,
			realm,
			name,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { region, realm, name, withDeleted },
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
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
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
		Logger.log('CharacterUpdate', { id, data });
		const result = await this.domainService.updateCharacter({
			id,
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
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
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
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
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
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
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
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
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
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async assignCharacter(
		id: number,
		user_id: Nullable<string>,
	): Promise<CharacterDAO> {
		const result = await this.domainService.assignCharacter(id, user_id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				const eventName =
					event.event_namespace + '.' + event.event_name;
				this.eventEmitter.emit(eventName, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, user_id },
			});
		}
	}
}
