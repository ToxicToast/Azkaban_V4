import { Controller, Logger } from '@nestjs/common';
import { AzkabanGroupTopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller(ControllerHelper('groups'))
export class GroupsController {
	@Span(AzkabanGroupTopics.LIST + '.service')
	@MessagePattern(AzkabanGroupTopics.LIST)
	async getGroupList(@Payload() payload: unknown) {
		Logger.log('Fetch Group List', payload);
		return [];
	}

	@Span(AzkabanGroupTopics.ID + '.service')
	@MessagePattern(AzkabanGroupTopics.ID)
	async getGroupById(@Payload() payload: unknown) {
		Logger.log('Fetch Group By Id', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.GROUPID + '.service')
	@MessagePattern(AzkabanGroupTopics.GROUPID)
	async getGroupByGroupId(@Payload() payload: unknown) {
		Logger.log('Fetch Group By Group Id', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.CREATE + '.service')
	@MessagePattern(AzkabanGroupTopics.CREATE)
	async createGroup(@Payload() payload: unknown) {
		Logger.log('Create New Group', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.UPDATE + '.service')
	@MessagePattern(AzkabanGroupTopics.UPDATE)
	async updateGroup(@Payload() payload: unknown) {
		Logger.log('Update Group', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.DELETE + '.service')
	@MessagePattern(AzkabanGroupTopics.DELETE)
	async deleteGroup(@Payload() payload: unknown) {
		Logger.log('Delete Group', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.RESTORE + '.service')
	@MessagePattern(AzkabanGroupTopics.RESTORE)
	async restoreGroup(@Payload() payload: unknown) {
		Logger.log('Restore Group', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.ACTIVATE + '.service')
	@MessagePattern(AzkabanGroupTopics.ACTIVATE)
	async activateGroup(@Payload() payload: unknown) {
		Logger.log('Activate Group', payload);
		return null;
	}

	@Span(AzkabanGroupTopics.DEACTIVATE + '.service')
	@MessagePattern(AzkabanGroupTopics.DEACTIVATE)
	async deactivateGroup(@Payload() payload: unknown) {
		Logger.log('Deactivate Group', payload);
		return null;
	}
}
