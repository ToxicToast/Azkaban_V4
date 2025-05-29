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
		withDeleted?: Optional<boolean>,
	): Promise<Result<Array<UserAnemic>>> {
		try {
			const result = await this.repsitory.findList(
				limit,
				offset,
				withDeleted,
			);
			return Result.ok<Array<UserAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<UserAnemic>>(error, 500);
		}
	}

	async getUserById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findById(id, withDeleted);
			if (result !== null) {
				return Result.ok<Nullable<UserAnemic>>(result);
			}
			return Result.fail<Nullable<UserAnemic>>('User not found', 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async getUserByUserId(
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findByUserId(
				user_id,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<UserAnemic>>(result);
			}
			return Result.fail<Nullable<UserAnemic>>('User not found', 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async getUserByUsername(
		username: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findByUsername(
				username,
				withDeleted,
			);
			if (result !== null) {
				return Result.ok<Nullable<UserAnemic>>(result);
			}
			return Result.fail<Nullable<UserAnemic>>('User not found', 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async getUserByEmail(
		email: string,
		withDeleted?: Optional<boolean>,
	): Promise<Result<Nullable<UserAnemic>>> {
		try {
			const result = await this.repsitory.findByEmail(email, withDeleted);
			if (result !== null) {
				return Result.ok<Nullable<UserAnemic>>(result);
			}
			return Result.fail<Nullable<UserAnemic>>('User not found', 404);
		} catch (error) {
			return Result.fail<Nullable<UserAnemic>>(error, 500);
		}
	}

	async createUser(data: UserData): Promise<Result<UserAnemic>> {
		try {
			const userByUsername = await this.getUserByUsername(data.username);
			const userByEmail = await this.getUserByEmail(data.email);
			if (userByUsername.isSuccess || userByEmail.isSuccess) {
				return Result.fail<UserAnemic>(
					'User already exists with this username or email',
					400,
				);
			}
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
