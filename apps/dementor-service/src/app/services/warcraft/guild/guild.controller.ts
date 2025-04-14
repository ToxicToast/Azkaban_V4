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
} from '@nestjs/common';
import {
	ControllerHelper,
	Optional,
	WarcraftGuildTopics,
} from '@azkaban/shared';
import { GuildService } from './guild.service';
import { Span } from 'nestjs-otel';
import { CreateGuildDTO } from '@azkaban/warcraft-infrastructure';

@Controller(ControllerHelper('warcraft/guild'))
export class GuildController {
	constructor(private readonly service: GuildService) {}

	@Span(WarcraftGuildTopics.LIST + '.dementor')
	@Get('/')
	async getCharacters(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		Logger.log('Get Guilds', { limit, offset });
		return await this.service.guildList(limit, offset).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.ID + '.dementor')
	@Get('/:id')
	async getGuildById(@Param('id') id: number) {
		Logger.log('Get Guild By Id', { id });
		return await this.service.guildById(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.GUILDID + '.dementor')
	@Get('/uuid/:id')
	async getGuildByGuildId(@Param('id') id: string) {
		Logger.log('Get Guild By Guild Id', { id });
		return await this.service.guildByGuildId(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.CREATE + '.dementor')
	@Post('/')
	async createGuild(@Body() body: CreateGuildDTO) {
		Logger.log('Create New Guild', { body });
		return await this.service.createGuild(body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.UPDATE + '.dementor')
	@Put('/:id')
	async updateGuild(@Param('id') id: number, @Body() body: unknown) {
		Logger.log('Update Guild', { id, body });
		return await this.service.updateGuild(id, body).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.DELETE + '.dementor')
	@Delete('/:id')
	async deleteGuild(@Param('id') id: number) {
		Logger.log('Delete Character', { id });
		return await this.service.deleteGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.RESTORE + '.dementor')
	@Patch('/restore/:id')
	async restoreGuild(@Param('id') id: number) {
		Logger.log('Restore Character', { id });
		return await this.service.restoreGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.ACTIVATE + '.dementor')
	@Patch('/activate/:id')
	async activateGuild(@Param('id') id: number) {
		Logger.log('Activate Character', { id });
		return await this.service.activateGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}

	@Span(WarcraftGuildTopics.DEACTIVATE + '.dementor')
	@Patch('/deactivate/:id')
	async deactivateGuild(@Param('id') id: number) {
		Logger.log('Deactivate Character', { id });
		return await this.service.deactivateGuild(id).catch((error) => {
			Logger.error(error);
			throw error;
		});
	}
}
