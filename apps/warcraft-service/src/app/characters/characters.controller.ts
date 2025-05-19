import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ControllerHelper, WarcraftCharacterTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { CharactersService } from './characters.service';
import {
	CharacterByCharacterIdDTO,
	CharacterByGuildDTO,
	CharacterByIdDTO,
	CharacterCreateDTO,
	CharacterList,
	CharacterUpdateDTO,
} from '../../utils';

@Controller(ControllerHelper('character'))
export class CharactersController {
	constructor(private readonly service: CharactersService) {}

	@Span(WarcraftCharacterTopics.LIST + '.service')
	@MessagePattern(WarcraftCharacterTopics.LIST)
	async getCharacterList(@Payload() payload: CharacterList) {
		return await this.service.characterList(payload);
	}

	@Span(WarcraftCharacterTopics.ID + '.service')
	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload() payload: CharacterByIdDTO) {
		return await this.service.characterById(payload);
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.service')
	@MessagePattern(WarcraftCharacterTopics.CHARACTERID)
	async getCharacterByCharacterId(
		@Payload() payload: CharacterByCharacterIdDTO,
	) {
		return await this.service.characterByCharacterId(payload);
	}

	@Span(WarcraftCharacterTopics.GUILD + '.service')
	@MessagePattern(WarcraftCharacterTopics.GUILD)
	async getCharacterByGuild(@Payload() payload: CharacterByGuildDTO) {
		return await this.service.characterByGuild(payload);
	}

	@Span(WarcraftCharacterTopics.CREATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.CREATE)
	async createCharacter(@Payload() payload: CharacterCreateDTO) {
		return await this.service.characterCreate(payload);
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.UPDATE)
	async updateCharacter(@Payload() payload: CharacterUpdateDTO) {
		return await this.service.characterUpdate(payload);
	}

	@Span(WarcraftCharacterTopics.DELETE + '.service')
	@MessagePattern(WarcraftCharacterTopics.DELETE)
	async deleteCharacter(@Payload() payload: CharacterByIdDTO) {
		return await this.service.characterDelete(payload);
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.service')
	@MessagePattern(WarcraftCharacterTopics.RESTORE)
	async restoreCharacter(@Payload() payload: CharacterByIdDTO) {
		return await this.service.characterRestore(payload);
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.ACTIVATE)
	async activateCharacter(@Payload() payload: CharacterByIdDTO) {
		return await this.service.characterActivate(payload);
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.DEACTIVATE)
	async deactivateCharacter(@Payload() payload: CharacterByIdDTO) {
		return await this.service.characterDeactivate(payload);
	}
}
