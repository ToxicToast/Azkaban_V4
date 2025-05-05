import { Controller, Logger } from '@nestjs/common';
import { ControllerHelper, WarcraftGuildTopics } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
	CharacterCreateDTO,
	CharacterUpdateDTO,
	GuildByGuildIdDTO,
	GuildByIdDTO,
	GuildList,
} from '../../utils';
import { GuildsService } from './guilds.service';

@Controller(ControllerHelper('guild'))
export class GuildsController {
	constructor(private readonly service: GuildsService) {}

	@Span(WarcraftGuildTopics.LIST + '.service')
	@MessagePattern(WarcraftGuildTopics.LIST)
	async getGuildList(@Payload() payload: GuildList) {
		Logger.log('Fetch Guild List', payload);
		return await this.service.guildList(payload);
	}

	@Span(WarcraftGuildTopics.ID + '.service')
	@MessagePattern(WarcraftGuildTopics.ID)
	async getGuildById(@Payload() payload: GuildByIdDTO) {
		Logger.log('Fetch Guild By Id', payload);
		return await this.service.guildById(payload);
	}

	@Span(WarcraftGuildTopics.GUILDID + '.service')
	@MessagePattern(WarcraftGuildTopics.GUILDID)
	async getGuildByGuildId(@Payload() payload: GuildByGuildIdDTO) {
		Logger.log('Fetch Guild By Guild Id', payload);
		return await this.service.guildByGuildId(payload);
	}

	@Span(WarcraftGuildTopics.CREATE + '.service')
	@MessagePattern(WarcraftGuildTopics.CREATE)
	async createGuild(@Payload() payload: CharacterCreateDTO) {
		Logger.log('Create New Guild', payload);
		return await this.service.guildCreate(payload);
	}

	@Span(WarcraftGuildTopics.UPDATE + '.service')
	@MessagePattern(WarcraftGuildTopics.UPDATE)
	async updateGuild(@Payload() payload: CharacterUpdateDTO) {
		Logger.log('Update Guild', payload);
		return await this.service.guildUpdate(payload);
	}

	@Span(WarcraftGuildTopics.DELETE + '.service')
	@MessagePattern(WarcraftGuildTopics.DELETE)
	async deleteGuild(@Payload() payload: GuildByIdDTO) {
		Logger.log('Delete Guild', payload);
		return await this.service.guildDelete(payload);
	}

	@Span(WarcraftGuildTopics.RESTORE + '.service')
	@MessagePattern(WarcraftGuildTopics.RESTORE)
	async restoreGuild(@Payload() payload: GuildByIdDTO) {
		Logger.log('Restore Guild', payload);
		return await this.service.guildRestore(payload);
	}

	@Span(WarcraftGuildTopics.ACTIVATE + '.service')
	@MessagePattern(WarcraftGuildTopics.ACTIVATE)
	async activateGuild(@Payload() payload: GuildByIdDTO) {
		Logger.log('Activate Guild', payload);
		return await this.service.guildActivate(payload);
	}

	@Span(WarcraftGuildTopics.DEACTIVATE + '.service')
	@MessagePattern(WarcraftGuildTopics.DEACTIVATE)
	async deactivateGuild(@Payload() payload: GuildByIdDTO) {
		Logger.log('Deactivate Guild', payload);
		return await this.service.guildDeactivate(payload);
	}
}
