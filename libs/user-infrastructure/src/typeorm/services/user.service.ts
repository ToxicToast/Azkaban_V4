import { UserService as DomainService } from '@azkaban/user-domain';
import { UserRepository } from '../repositories';
import { Nullable, UuidHelper } from '@azkaban/shared';
import { HttpStatus } from '@nestjs/common';
import { UserDAO } from '../../dao';
import { CreateUserDTO, UpdateUserDTO } from '../../dto';
import { RpcException } from '@nestjs/microservices';

export class UserService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: UserRepository) {
		this.domainService = new DomainService(this.repository);
	}

	async getUserList(): Promise<Array<UserDAO>> {
		const result = await this.domainService.getUsers();
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getUserById(id: string): Promise<Nullable<UserDAO>> {
		const result = await this.domainService.getUserById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async getUserByEmail(email: string): Promise<Nullable<UserDAO>> {
		const result = await this.domainService.getUserByEmail(email);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async createUser(data: CreateUserDTO): Promise<UserDAO> {
		const id = UuidHelper.create().value;
		const result = await this.domainService.createUser({ ...data, id });
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.BAD_REQUEST,
				message: 'Could not create user',
				raw: result.errorValue,
			});
		}
	}

	async updateUser(id: string, data: UpdateUserDTO): Promise<UserDAO> {
		const result = await this.domainService.updateUser(
			id,
			data.username,
			data.email,
			data.password,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async loginUser(id: string, loggedin_at: Nullable<Date>): Promise<UserDAO> {
		const result = await this.domainService.loginUser(id, loggedin_at);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async banUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.banUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async unbanUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.unbanUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async activateUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.activateUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async deactivateUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.deactivateUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async deleteUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.deleteUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}

	async restoreUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.restoreUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: HttpStatus.NOT_FOUND,
				message: 'User not found',
				raw: result.errorValue,
			});
		}
	}
}
