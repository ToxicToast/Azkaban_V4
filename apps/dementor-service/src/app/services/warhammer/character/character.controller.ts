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
	WarhammerCharacterTopics,
} from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { JwtAuthGuard, OptionalJwtAuthGuard } from '../../../guards';
import { User } from '../../../decorators';
import { CharacterService } from './character.service';

@Controller(ControllerHelper('warhammer/character'))
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Span(WarhammerCharacterTopics.LIST + '.dementor')
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

	@Span(WarhammerCharacterTopics.ID + '.dementor')
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

	@Span(WarhammerCharacterTopics.CHARACTERID + '.dementor')
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

	@Span(WarhammerCharacterTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createCharacter(@Body() body: unknown) {
		Logger.log({
			body,
		});
	}

	@Span(WarhammerCharacterTopics.UPDATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Put('/:id')
	async updateCharacter(@Param('id') id: number, @Body() body: unknown) {
		Logger.log({
			id,
			body,
		});
	}

	@Span(WarhammerCharacterTopics.DELETE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async deleteCharacter(@Param('id') id: number) {
		Logger.log({
			id,
		});
	}

	@Span(WarhammerCharacterTopics.RESTORE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/restore/:id')
	async restoreCharacter(@Param('id') id: number) {
		Logger.log({
			id,
		});
	}

	@Span(WarhammerCharacterTopics.ACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/activate/:id')
	async activateCharacter(@Param('id') id: number) {
		Logger.log({
			id,
		});
	}

	@Span(WarhammerCharacterTopics.DEACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/deactivate/:id')
	async deactivateCharacter(@Param('id') id: number) {
		Logger.log({
			id,
		});
	}
}
