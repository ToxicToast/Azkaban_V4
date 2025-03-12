import { UserFactory } from '../factories';
import { UserRepository } from '../repositories';
import { UserAnemic } from '../anemics';
import { Optional, Result } from '@azkaban/shared';
import { UserData } from '../data';

export class UserService {
	private readonly factory: UserFactory = new UserFactory();

	constructor(private readonly repository: UserRepository) {}

	private async save(anemic: UserAnemic): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async getUsers(): Promise<Result<Array<UserAnemic>>> {
		try {
			const result = await this.repository.findList();
			return Result.ok<Array<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<UserAnemic>>(error, 500);
		}
	}

	async getUserById(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.findById(id);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async getUserByEmail(email: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.findByEmail(email);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async createUser(data: UserData): Promise<Result<UserAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			return await this.save(aggregate.toAnemic());
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async updateUser(
		id: string,
		username?: Optional<string>,
		email?: Optional<string>,
		password?: Optional<string>,
		salt?: Optional<string>,
	): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				if (username) {
					aggregate.changeUsername(username);
				}
				if (email) {
					aggregate.changeEmail(email);
				}
				if (password) {
					aggregate.changePassword(password);
				}
				if (salt) {
					aggregate.changeSalt(salt);
				}
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async banUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.banUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async unbanUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.unbanUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async activateUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async deactivateUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async deleteUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async restoreUser(id: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreUser();
				return await this.save(aggregate.toAnemic());
			}
			return Result.fail<UserAnemic>(result.errorValue, 500);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}
}
