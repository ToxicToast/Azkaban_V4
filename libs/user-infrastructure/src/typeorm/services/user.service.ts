import { UserService as DomainService } from '@azkaban/user-domain';
import { UserRepository } from '../repositories';
import { Nullable, UuidHelper } from '@azkaban/shared';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDAO } from '../../dao';
import { CreateUserDTO, UpdateUserDTO } from '../../dto';

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
			throw new NotFoundException(result.errorValue);
		}
	}

	async createUser(data: CreateUserDTO): Promise<UserDAO> {
		const id = UuidHelper.create().value;
		const result = await this.domainService.createUser({ ...data, id });
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new BadRequestException(result.errorValue);
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
			throw new NotFoundException(result.errorValue);
		}
	}

	async banUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.banUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}

	async unbanUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.unbanUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}

	async activateUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.activateUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}

	async deactivateUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.deactivateUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}

	async deleteUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.deleteUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}

	async restoreUser(id: string): Promise<UserDAO> {
		const result = await this.domainService.restoreUser(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new NotFoundException(result.errorValue);
		}
	}
}
