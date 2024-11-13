import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { GroupService } from './group.service';
import {
	GroupPermissions,
	PermissionGuard,
} from '@azkaban/gateway-infrastructure';

@Controller('groups')
export class GroupController {
	constructor(private readonly service: GroupService) {}

	@Get()
	@UseGuards(PermissionGuard(GroupPermissions.CAN_READ))
	async getGroups() {
		return await this.service.getGroups().catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Get(':id')
	@UseGuards(PermissionGuard(GroupPermissions.CAN_READ))
	async getGroupById(@Param('id') id: string) {
		return await this.service.getGroupById(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Post()
	@UseGuards(PermissionGuard(GroupPermissions.CAN_CREATE))
	async createGroup(@Body('title') title: string) {
		return await this.service.createGroup(title).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Put(':id')
	@UseGuards(PermissionGuard(GroupPermissions.CAN_UPDATE))
	async updateGroup(
		@Param('id') id: string,
		@Body('title') title?: Optional<string>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
	) {
		return await this.service
			.updateGroup(id, title, activated_at)
			.catch((error) => {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			});
	}

	@Delete(':id')
	@UseGuards(PermissionGuard(GroupPermissions.CAN_DELETE))
	async deleteGroup(@Param('id') id: string) {
		return await this.service.deleteGroup(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Put('restore/:id')
	@UseGuards(PermissionGuard(GroupPermissions.CAN_RESTORE))
	async restoreGroup(@Param('id') id: string) {
		return await this.service.restoreGroup(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}
}
