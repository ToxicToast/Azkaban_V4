import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WarcraftCharacterTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { CharactersService } from './characters.service';
import {
	CharacterByCharacterIdDTO,
	CharacterByGuildDTO,
	CharacterByIdDTO,
	CharacterCreateDTO,
	CharacterList,
	CharacterUpdateDTO,
} from '../dtos';

@Controller()
export class CharactersController {
	constructor(private readonly service: CharactersService) {}

	@Span(WarcraftCharacterTopics.LIST + '.service')
	@MessagePattern(WarcraftCharacterTopics.LIST)
	async getCharacterList(@Payload() payload: CharacterList) {
		Logger.log('Fetch Character List', payload);
		return this.service.characterList(payload);
	}

	@Span(WarcraftCharacterTopics.ID + '.service')
	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload() payload: CharacterByIdDTO) {
		Logger.log('Fetch Character By Id', payload);
		return this.service.characterById(payload);
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.service')
	@MessagePattern(WarcraftCharacterTopics.CHARACTERID)
	async getCharacterByCharacterId(
		@Payload() payload: CharacterByCharacterIdDTO,
	) {
		Logger.log('Fetch Character By Character Id', payload);
		return this.service.characterByCharacterId(payload);
	}

	@Span(WarcraftCharacterTopics.GUILD + '.service')
	@MessagePattern(WarcraftCharacterTopics.GUILD)
	async getCharacterByGuild(@Payload() payload: CharacterByGuildDTO) {
		Logger.log('Fetch Character By Guild', payload);
		return this.service.characterByGuild(payload);
	}

	@Span(WarcraftCharacterTopics.CREATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.CREATE)
	async createCharacter(@Payload() payload: CharacterCreateDTO) {
		Logger.log('Create New Character', payload);
		return this.service.characterCreate(payload);
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.UPDATE)
	async updateCharacter(@Payload() payload: CharacterUpdateDTO) {
		Logger.log('Update Character', payload);
		return this.service.characterUpdate(payload);
	}

	@Span(WarcraftCharacterTopics.DELETE + '.service')
	@MessagePattern(WarcraftCharacterTopics.DELETE)
	async deleteCharacter(@Payload() payload: CharacterByIdDTO) {
		Logger.log('Delete Character', payload);
		return this.service.characterDelete(payload);
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.service')
	@MessagePattern(WarcraftCharacterTopics.RESTORE)
	async restoreCharacter(@Payload() payload: CharacterByIdDTO) {
		Logger.log('Restore Character', payload);
		return this.service.characterRestore(payload);
	}
}
