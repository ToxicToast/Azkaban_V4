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
import { UserService } from './user.service';
import {
	PermissionGuard,
	UserPermissions,
} from '@azkaban/gateway-infrastructure';

@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) {}

	@Get()
	@UseGuards(PermissionGuard(UserPermissions.CAN_READ))
	async getUsers() {
		return await this.service.getUsers().catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Get(':id')
	@UseGuards(PermissionGuard(UserPermissions.CAN_READ))
	async getUserById(@Param('id') id: string) {
		return await this.service.getUserById(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Post()
	@UseGuards(PermissionGuard(UserPermissions.CAN_CREATE))
	async createUser(
		@Body('email') email: string,
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return await this.service
			.createUser(email, username, password)
			.catch((error) => {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			});
	}

	@Put(':id')
	@UseGuards(PermissionGuard(UserPermissions.CAN_UPDATE))
	async updateUser(
		@Param('id') id: string,
		@Body('username') username?: Optional<string>,
		@Body('password') password?: Optional<string>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
		@Body('otp_secret') otp_secret?: Optional<Nullable<string>>,
	) {
		return await this.service
			.updateUser(id, username, password, activated_at, otp_secret)
			.catch((error) => {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			});
	}

	@Delete(':id')
	@UseGuards(PermissionGuard(UserPermissions.CAN_DELETE))
	async deleteUser(@Param('id') id: string) {
		return await this.service.deleteUser(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}

	@Put('restore/:id')
	@UseGuards(PermissionGuard(UserPermissions.CAN_RESTORE))
	async restoreUser(@Param('id') id: string) {
		return await this.service.restoreUser(id).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}
}
