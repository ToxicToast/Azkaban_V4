import { CharacterService as DomainService } from '@azkaban/warhammer-domain';
import { CharacterRepository } from '../repositories';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Optional, UuidHelper } from '@azkaban/shared';
import { CharacterDAO } from '../../dao';
import { RpcException } from '@nestjs/microservices';
import { CreateCharacterDTO, UpdateCharacterDTO } from '../../dto';
import { Logger } from '@nestjs/common';

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
				this.eventEmitter.emit(event.event_name, event);
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
		const { fate, wounds, corruption } = data;
		Logger.log('CharacterUpdate', { id, data });
		const result = await this.domainService.updateCharacter({
			id,
			fate,
			wounds,
			corruption,
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('Character Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
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
				this.eventEmitter.emit(event.event_name, event);
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
				this.eventEmitter.emit(event.event_name, event);
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
				this.eventEmitter.emit(event.event_name, event);
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
				this.eventEmitter.emit(event.event_name, event);
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
}
