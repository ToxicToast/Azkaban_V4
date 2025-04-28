import { UserAnemic } from '../anemics';
import { UserFactory } from '../factories';
import { UserRepository } from '../repositories';
import { DomainEvent, Nullable, Optional, Result } from '@azkaban/shared';
import { UpdateUserData, UserData } from '../data';

export class UserService {
	private readonly factory: UserFactory = new UserFactory();

	constructor(private readonly repsitory: UserRepository) {}

	private async save(
		anemic: UserAnemic,
		events: Array<DomainEvent>,
	): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repsitory.save(anemic);
			return Result.ok<UserAnemic>(result, events);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async getUsers(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Result<Array<UserAnemic>>> {
		try {
			const result = await this.repsitory.findList(limit, offset);
			return Result.ok<Array<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<UserAnemic>>(error, 500);
		}
	}

	async getUserById(id: number): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findById(id);
			return Result.ok<Nullable<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async getUserByUserId(
		user_id: string,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findByUserId(user_id);
			return Result.ok<Nullable<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async createUser(data: UserData): Promise<Result<UserAnemic>> {
		try {
			const aggregate = this.factory.createDomain(data);
			const anemic = aggregate.toAnemic();
			const user = anemic.user;
			const events = anemic.events;
			return await this.save(user, events);
		} catch (error) {
			return Result.fail<UserAnemic>(error, 500);
		}
	}

	async updateUser(
		data: UpdateUserData,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.getUserById(data.id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				const { username, email, password, salt, loggedin_at } = data;
				if (username !== undefined) {
					aggregate.changeUsername(username);
				}
				if (email !== undefined) {
					aggregate.changeEmail(email);
				}
				if (loggedin_at !== undefined) {
					aggregate.changeLoggedIn(loggedin_at);
				}
				if (password !== undefined && salt !== undefined) {
					aggregate.changePassword(password, salt);
				}
				const anemic = aggregate.toAnemic();
				const user = anemic.user;
				const events = anemic.events;
				return await this.save(user, events);
			}
			return Result.fail<Nullable<UserAnemic>>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async deleteUser(id: number): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deleteUser();
				const anemic = aggregate.toAnemic();
				const user = anemic.user;
				const events = anemic.events;
				return await this.save(user, events);
			}
			return Result.fail<Nullable<UserAnemic>>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async restoreUser(id: number): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.restoreUser();
				const anemic = aggregate.toAnemic();
				const user = anemic.user;
				const events = anemic.events;
				return await this.save(user, events);
			}
			return Result.fail<Nullable<UserAnemic>>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async activateUser(id: number): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.activateUser();
				const anemic = aggregate.toAnemic();
				const user = anemic.user;
				const events = anemic.events;
				return await this.save(user, events);
			}
			return Result.fail<Nullable<UserAnemic>>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async deactivateUser(id: number): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.getUserById(id);
			if (result.isSuccess) {
				const aggregate = this.factory.reconstitute(result.value);
				aggregate.deactivateUser();
				const anemic = aggregate.toAnemic();
				const user = anemic.user;
				const events = anemic.events;
				return await this.save(user, events);
			}
			return Result.fail<Nullable<UserAnemic>>(result.errorValue, 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}
}
