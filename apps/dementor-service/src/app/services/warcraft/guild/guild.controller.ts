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
	WarcraftGuildTopics,
} from '@azkaban/shared';
import { GuildService } from './guild.service';
import { Span } from 'nestjs-otel';
import {
	CreateGuildDTO,
	UpdateGuildDTO,
} from '@azkaban/warcraft-infrastructure';
import { JwtAuthGuard } from '../../../guards';

@Controller(ControllerHelper('warcraft/guild'))
export class GuildController {
	constructor(private readonly service: GuildService) {}

	@Span(WarcraftGuildTopics.LIST + '.dementor')
	@Get('/')
	async getCharacters(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		return await this.service.guildList(limit, offset).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.ID + '.dementor')
	@Get('/:id')
	async getGuildById(@Param('id') id: number) {
		return await this.service.guildById(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.GUILDID + '.dementor')
	@Get('/uuid/:id')
	async getGuildByGuildId(@Param('id') id: string) {
		return await this.service.guildByGuildId(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.CREATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Post('/')
	async createGuild(@Body() body: CreateGuildDTO) {
		return await this.service.createGuild(body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.UPDATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Put('/:id')
	async updateGuild(@Param('id') id: number, @Body() body: UpdateGuildDTO) {
		return await this.service.updateGuild(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.DELETE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Delete('/:id')
	async deleteGuild(@Param('id') id: number) {
		return await this.service.deleteGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.RESTORE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/restore/:id')
	async restoreGuild(@Param('id') id: number) {
		return await this.service.restoreGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.ACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/activate/:id')
	async activateGuild(@Param('id') id: number) {
		return await this.service.activateGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.DEACTIVATE + '.dementor')
	@UseGuards(JwtAuthGuard)
	@Patch('/deactivate/:id')
	async deactivateGuild(@Param('id') id: number) {
		return await this.service.deactivateGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}
}
