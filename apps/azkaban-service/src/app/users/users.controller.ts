import { Controller, Logger } from '@nestjs/common';
import { AzkabanUserTopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller(ControllerHelper('users'))
export class UsersController {
	@Span(AzkabanUserTopics.LIST + '.service')
	@MessagePattern(AzkabanUserTopics.LIST)
	async getUserList(@Payload() payload: unknown) {
		Logger.debug('Fetch User List', payload);
		return [];
	}

	@Span(AzkabanUserTopics.ID + '.service')
	@MessagePattern(AzkabanUserTopics.ID)
	async getUserById(@Payload() payload: unknown) {
		Logger.debug('Fetch User By Id', payload);
		return null;
	}

	@Span(AzkabanUserTopics.USERID + '.service')
	@MessagePattern(AzkabanUserTopics.USERID)
	async getUserByUserId(@Payload() payload: unknown) {
		Logger.debug('Fetch User By User Id', payload);
		return null;
	}

	@Span(AzkabanUserTopics.CREATE + '.service')
	@MessagePattern(AzkabanUserTopics.CREATE)
	async createUser(@Payload() payload: unknown) {
		Logger.debug('Create New User', payload);
		return null;
	}

	@Span(AzkabanUserTopics.UPDATE + '.service')
	@MessagePattern(AzkabanUserTopics.UPDATE)
	async updateUser(@Payload() payload: unknown) {
		Logger.debug('Update User', payload);
		return null;
	}

	@Span(AzkabanUserTopics.DELETE + '.service')
	@MessagePattern(AzkabanUserTopics.DELETE)
	async deleteUser(@Payload() payload: unknown) {
		Logger.debug('Delete User', payload);
		return null;
	}

	@Span(AzkabanUserTopics.RESTORE + '.service')
	@MessagePattern(AzkabanUserTopics.RESTORE)
	async restoreUser(@Payload() payload: unknown) {
		Logger.debug('Restore User', payload);
		return null;
	}

	@Span(AzkabanUserTopics.ACTIVATE + '.service')
	@MessagePattern(AzkabanUserTopics.ACTIVATE)
	async activateUser(@Payload() payload: unknown) {
		Logger.debug('Activate User', payload);
		return null;
	}

	@Span(AzkabanUserTopics.DEACTIVATE + '.service')
	@MessagePattern(AzkabanUserTopics.DEACTIVATE)
	async deactivateUser(@Payload() payload: unknown) {
		Logger.debug('Deactivate User', payload);
		return null;
	}
}
