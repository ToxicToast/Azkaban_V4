import { Controller, Logger } from '@nestjs/common';
import { AzkabanUserTopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
	UserByIdDTO,
	UserByUserIdDTO,
	UsersListDTO,
	UserCreateDTO,
	UserUpdateDTO,
} from '../../utils';

@Controller(ControllerHelper('users'))
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Span(AzkabanUserTopics.LIST + '.service')
	@MessagePattern(AzkabanUserTopics.LIST)
	async getUserList(@Payload() payload: UsersListDTO) {
		Logger.log('Fetch User List', payload);
		return this.service.userList(payload);
	}

	@Span(AzkabanUserTopics.ID + '.service')
	@MessagePattern(AzkabanUserTopics.ID)
	async getUserById(@Payload() payload: UserByIdDTO) {
		Logger.log('Fetch User By Id', payload);
		return this.service.userById(payload);
	}

	@Span(AzkabanUserTopics.USERID + '.service')
	@MessagePattern(AzkabanUserTopics.USERID)
	async getUserByUserId(@Payload() payload: UserByUserIdDTO) {
		Logger.log('Fetch User By User Id', payload);
		return this.service.userByUserId(payload);
	}

	@Span(AzkabanUserTopics.CREATE + '.service')
	@MessagePattern(AzkabanUserTopics.CREATE)
	async createUser(@Payload() payload: UserCreateDTO) {
		Logger.log('Create New User', payload);
		return this.service.userCreate(payload);
	}

	@Span(AzkabanUserTopics.UPDATE + '.service')
	@MessagePattern(AzkabanUserTopics.UPDATE)
	async updateUser(@Payload() payload: UserUpdateDTO) {
		Logger.log('Update User', payload);
		return this.service.userUpdate(payload);
	}

	@Span(AzkabanUserTopics.DELETE + '.service')
	@MessagePattern(AzkabanUserTopics.DELETE)
	async deleteUser(@Payload() payload: UserByIdDTO) {
		Logger.log('Delete User', payload);
		return this.service.userDelete(payload);
	}

	@Span(AzkabanUserTopics.RESTORE + '.service')
	@MessagePattern(AzkabanUserTopics.RESTORE)
	async restoreUser(@Payload() payload: UserByIdDTO) {
		Logger.log('Restore User', payload);
		return this.service.userRestore(payload);
	}

	@Span(AzkabanUserTopics.ACTIVATE + '.service')
	@MessagePattern(AzkabanUserTopics.ACTIVATE)
	async activateUser(@Payload() payload: UserByIdDTO) {
		Logger.log('Activate User', payload);
		return this.service.userActivate(payload);
	}

	@Span(AzkabanUserTopics.DEACTIVATE + '.service')
	@MessagePattern(AzkabanUserTopics.DEACTIVATE)
	async deactivateUser(@Payload() payload: UserByIdDTO) {
		Logger.log('Deactivate User', payload);
		return this.service.userDeactivate(payload);
	}
}
