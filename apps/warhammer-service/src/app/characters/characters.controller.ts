import { Controller, Logger } from '@nestjs/common';
import { ControllerHelper, WarhammerCharacterTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CharactersService } from './characters.service';
import {
	CharacterByCharacterId,
	CharacterById,
	CharacterList,
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
	async createCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'createCharacter');
	}

	@Span(WarhammerCharacterTopics.UPDATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.UPDATE)
	async updateCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'updateCharacter');
	}

	@Span(WarhammerCharacterTopics.DELETE + '.service')
	@MessagePattern(WarhammerCharacterTopics.DELETE)
	async deleteCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'deleteCharacter');
	}

	@Span(WarhammerCharacterTopics.RESTORE + '.service')
	@MessagePattern(WarhammerCharacterTopics.RESTORE)
	async restoreCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'restoreCharacter');
	}

	@Span(WarhammerCharacterTopics.ACTIVATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.ACTIVATE)
	async activateCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'activateCharacter');
	}

	@Span(WarhammerCharacterTopics.DEACTIVATE + '.service')
	@MessagePattern(WarhammerCharacterTopics.DEACTIVATE)
	async deactivateCharacter(@Payload() payload: unknown) {
		Logger.log({ payload }, 'deactivateCharacter');
	}
}
