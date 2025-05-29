import { UserService as DomainService } from '@azkaban/azkaban-domain';
import { UserRepository } from '../repositories';
import {
	Optional,
	PasswordCompare,
	PasswordHash,
	PasswordSalt,
	UuidHelper,
} from '@azkaban/shared';
import { UserDAO } from '../../dao';
import { RpcException } from '@nestjs/microservices';
import { CreateUserWithoutSaltDTO, UpdateUserDTO } from '../../dto';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class UserService {
	private readonly domainService: DomainService;

	constructor(
		private readonly repository: UserRepository,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.domainService = new DomainService(this.repository);
	}

	async getUserList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<UserDAO>> {
		const result = await this.domainService.getUsers(
			limit,
			offset,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { limit, offset },
			});
		}
	}

	async getUserById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const result = await this.domainService.getUserById(id, withDeleted);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async getUserByUserId(
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const result = await this.domainService.getUserByUserId(
			user_id,
			withDeleted,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { user_id },
			});
		}
	}

	async createUser(data: CreateUserWithoutSaltDTO): Promise<UserDAO> {
		const user_id = UuidHelper.create().value;
		const salt = await PasswordSalt();
		const password = await PasswordHash(data.password, salt);
		const result = await this.domainService.createUser({
			...data,
			user_id,
			salt,
			password,
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { data, user_id },
			});
		}
	}

	async updateUser(id: number, data: UpdateUserDTO): Promise<UserDAO> {
		const { username, email, password, salt, loggedin_at } = data;
		Logger.log('UserUpdate', { id, data });
		const result = await this.domainService.updateUser({
			id,
			username,
			email,
			password,
			salt,
			loggedin_at,
		});
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id, data },
			});
		}
	}

	async deleteUser(id: number): Promise<UserDAO> {
		const result = await this.domainService.deleteUser(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async restoreUser(id: number): Promise<UserDAO> {
		const result = await this.domainService.restoreUser(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async activateUser(id: number): Promise<UserDAO> {
		const result = await this.domainService.activateUser(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async deactivateUser(id: number): Promise<UserDAO> {
		const result = await this.domainService.deactivateUser(id);
		if (result.isSuccess) {
			const events = result.events;
			Logger.log('User Events', events);
			for (const event of events) {
				this.eventEmitter.emit(event.event_name, event);
			}
			return result.value;
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { id },
			});
		}
	}

	async loginUser(data: {
		username: string;
		password: string;
	}): Promise<UserDAO> {
		const result = await this.domainService.getUserByUsername(
			data.username,
		);
		if (result.isSuccess) {
			const user = result.value;
			const isValidPassword = await PasswordCompare(
				data.password,
				user.password,
			);
			if (
				isValidPassword &&
				user.activated_at !== null &&
				user.deleted_at === null
			) {
				const result = await this.domainService.updateUser({
					id: user.id,
					loggedin_at: new Date(),
				});
				if (result.isSuccess) {
					const events = result.events;
					Logger.log('User Events', events);
					for (const event of events) {
						this.eventEmitter.emit(event.event_name, event);
					}
					return result.value;
				}
			}
			throw new RpcException({
				status: 401,
				message: 'Invalid credentials',
				raw: { ...data },
			});
		} else {
			throw new RpcException({
				status: result.errorCode,
				message: result.errorValue,
				raw: { ...data },
			});
		}
	}
}
