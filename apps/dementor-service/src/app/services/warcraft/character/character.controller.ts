import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	ControllerHelper,
	Optional,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { CharacterService } from './character.service';
import { Span } from 'nestjs-otel';
import {
	CreateCharacterDTO,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import { JwtAuthGuard } from '../../../guards';

@Controller(ControllerHelper('warcraft/character'))
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Span(WarcraftCharacterTopics.LIST + '.dementor')
	@Get('/')
	async getCharacters(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		Logger.log('Get Characters', { limit, offset });
		return await this.service
			.characterList(limit, offset)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}

	@Span(WarcraftCharacterTopics.ID + '.dementor')
	@Get('/:id')
	async getCharacterById(@Param('id') id: number) {
		Logger.log('Get Character By Id', { id });
		return await this.service.characterById(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.dementor')
	@Get('/uuid/:id')
	async getCharacterByCharacterId(@Param('id') id: string) {
		Logger.log('Get Character By Character Id', { id });
		return await this.service.characterByCharacterId(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.GUILD + '.dementor')
	@Get('/guild/:name')
	async getCharacterByGuildId(@Param('name') name: string) {
		Logger.log('Get Character By Guild', { name });
		return await this.service.characterByGuild(name).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createCharacter(@Body() body: CreateCharacterDTO) {
		Logger.log('Create New Character', { body });
		return await this.service.createCharacter(body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.UPDATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Put('/:id')
	async updateCharacter(
		@Param('id') id: number,
		@Body() body: UpdateCharacterDTO,
	) {
		Logger.log('Update Character', { id, body });
		return await this.service.updateCharacter(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.DELETE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async deleteCharacter(@Param('id') id: number) {
		Logger.log('Delete Character', { id });
		return await this.service.deleteCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/restore/:id')
	async restoreCharacter(@Param('id') id: number) {
		Logger.log('Restore Character', { id });
		return await this.service.restoreCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/activate/:id')
	async activateCharacter(@Param('id') id: number) {
		Logger.log('Activate Character', { id });
		return await this.service.activateCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/deactivate/:id')
	async deactivateCharacter(@Param('id') id: number) {
		Logger.log('Deactivate Character', { id });
		return await this.service.deactivateCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}
}
