import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListQuery } from './queries';

@Injectable()
export class UserService {
	constructor(private readonly queryBus: QueryBus) {}

	async userList(): Promise<unknown> {
		return await this.queryBus.execute(new ListQuery());
	}
}
