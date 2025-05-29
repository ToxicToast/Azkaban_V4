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
	Nullable,
	Optional,
	WarcraftCharacterTopics,
} from '@azkaban/shared';
import { CharacterService } from './character.service';
import { Span } from 'nestjs-otel';
import {
	AssignCharacterDTO,
	CreateCharacterDTO,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../../../guards';
import { User } from '../../../decorators';

@Controller(ControllerHelper('warcraft/character'))
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Span(WarcraftCharacterTopics.LIST + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/')
	async getCharacters(
		@User() user: Nullable<string>,
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		return await this.service
			.characterList(limit, offset, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}

	@Span(WarcraftCharacterTopics.ID + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/:id')
	async getCharacterById(
		@User() user: Nullable<string>,
		@Param('id') id: number,
	) {
		return await this.service
			.characterById(id, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}

	@Span(WarcraftCharacterTopics.CHARACTERID + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/uuid/:id')
	async getCharacterByCharacterId(
		@User() user: Nullable<string>,
		@Param('id') id: string,
	) {
		return await this.service
			.characterByCharacterId(id, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}

	@Span(WarcraftCharacterTopics.GUILD + '.dementor')
	@UseGuards(OptionalJwtAuthGuard)
	@Get('/guild/:name')
	async getCharacterByGuildId(
		@User() user: Nullable<string>,
		@Param('name') name: string,
	) {
		return await this.service
			.characterByGuild(name, user !== null)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}

	@Span(WarcraftCharacterTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createCharacter(@Body() body: CreateCharacterDTO) {
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
		return await this.service.updateCharacter(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.DELETE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async deleteCharacter(@Param('id') id: number) {
		return await this.service.deleteCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.RESTORE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/restore/:id')
	async restoreCharacter(@Param('id') id: number) {
		return await this.service.restoreCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.ACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/activate/:id')
	async activateCharacter(@Param('id') id: number) {
		return await this.service.activateCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.DEACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/deactivate/:id')
	async deactivateCharacter(@Param('id') id: number) {
		return await this.service.deactivateCharacter(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftCharacterTopics.ASSIGN + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Put('/assign/:id')
	async assignCharacter(
		@Param('id') id: number,
		@Body() body: AssignCharacterDTO,
	) {
		return await this.service
			.assignCharacter(id, body.user_id)
			.catch((error) => {
				Logger.error(error);
				throw error;
			});
	}
}
