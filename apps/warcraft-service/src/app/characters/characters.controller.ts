import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WarcraftCharacterTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';

@Controller()
export class CharactersController {
	@Span(WarcraftCharacterTopics.LIST + '.service')
	@MessagePattern(WarcraftCharacterTopics.LIST)
	async getCharacterList(@Payload() payload) {
		Logger.log('Fetch Character List', payload);
		return [];
	}

	@Span(WarcraftCharacterTopics.ID + '.service')
	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload() payload) {
		Logger.log('Fetch Character ById', payload);
		return {
			...payload,
		};
	}

	@Span(WarcraftCharacterTopics.CREATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.CREATE)
	async createCharacter(@Payload() payload) {
		Logger.log('Create New Character', payload);
		return {
			...payload,
		};
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.service')
	@MessagePattern(WarcraftCharacterTopics.UPDATE)
	async updateCharacter(@Payload() payload) {
		Logger.log('Update Character', payload);
		return {
			...payload,
		};
	}

	@Span(WarcraftCharacterTopics.DELETE + '.service')
	@MessagePattern(WarcraftCharacterTopics.DELETE)
	async deleteCharacter(@Payload() payload) {
		Logger.log('Delete Character', payload);
		return {
			...payload,
		};
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.service')
	@MessagePattern(WarcraftCharacterTopics.RESTORE)
	async restoreCharacter(@Payload() payload) {
		Logger.log('Restore Character', payload);
		return {
			...payload,
		};
	}
}
