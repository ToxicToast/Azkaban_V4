import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Span } from 'nestjs-otel';

@Injectable()
export class UsersService {
	constructor(
		// Cache
		// Repository
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Span('userList')
	async userList(data: unknown): Promise<Array<unknown>> {
		Logger.log('UserList', data);
		const users = [];
		Logger.log('users', users);
		// Cache
		return users;
	}
}
