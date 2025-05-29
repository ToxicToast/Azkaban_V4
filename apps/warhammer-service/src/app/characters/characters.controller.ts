import { Controller } from '@nestjs/common';
import { ControllerHelper, WarhammerCharacterTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CharactersService } from './characters.service';
import {
	CharacterByCharacterId,
	CharacterById,
	CharacterCreate,
	CharacterList,
	CharacterUpdate,
	CharacterAssign,
} from '../../utils/dtos';
@Controller(ControllerHelper('character'))
export class CharactersController {
	constructor(private readonly service: CharactersService) {}

	@Span(WarhammerCharacterTopics.LIST + '.service')
	@MessagePattern(WarhammerCharacterTopics.LIST)
	async getCharacterList(@Payload() payload: CharacterList) {
		return await this.service.characterList(payload);
	}

	@Span(WarhammerCharacterTopics.ID + '.service')
	@MessagePattern(WarhammerCharacterTopics.ID)
	async getCharacterById(@Payload() payload: CharacterById) {
		return await this.service.characterById(payload);
	}

	@Span(WarhammerCharacterTopics.CHARACTERID + '.service')
	@MessagePattern(WarhammerCharacterTopics.CHARACTERID)
	async getCharacterByCharacterId(
		@Payload() payload: CharacterByCharacterId,
	) {
		return await this.service.characterByCharacterId(payload);
	}

	@Span(WarhammerCharacterTopics.CREATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.CREATE)
	async createCharacter(@Payload() payload: CharacterCreate) {
		return await this.service.characterCreate(payload);
	}

	@Span(WarhammerCharacterTopics.UPDATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.UPDATE)
	async updateCharacter(@Payload() payload: CharacterUpdate) {
		return await this.service.characterUpdate(payload);
	}

	@Span(WarhammerCharacterTopics.DELETE + '.service')
	@MessagePattern(WarhammerCharacterTopics.DELETE)
	async deleteCharacter(@Payload() payload: CharacterById) {
		return await this.service.characterDelete(payload);
	}

	@Span(WarhammerCharacterTopics.RESTORE + '.service')
	@MessagePattern(WarhammerCharacterTopics.RESTORE)
	async restoreCharacter(@Payload() payload: CharacterById) {
		return await this.service.characterRestore(payload);
	}

	@Span(WarhammerCharacterTopics.ACTIVATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.ACTIVATE)
	async activateCharacter(@Payload() payload: CharacterById) {
		return await this.service.characterActivate(payload);
	}

	@Span(WarhammerCharacterTopics.DEACTIVATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.DEACTIVATE)
	async deactivateCharacter(@Payload() payload: CharacterById) {
		return await this.service.characterDeactivate(payload);
	}

	@Span(WarhammerCharacterTopics.ASSIGN + '.service')
	@MessagePattern(WarhammerCharacterTopics.ASSIGN)
	async assignCharacter(@Payload() payload: CharacterAssign) {
		return await this.service.characterAssign(payload);
	}
}
