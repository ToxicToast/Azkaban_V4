import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IdQuery, ListQuery } from './queries';

@Injectable()
export class UserService {
	constructor(private readonly queryBus: QueryBus) {}

	async userList(): Promise<unknown> {
		return await this.queryBus.execute(new ListQuery());
	}

	async userById(id: string): Promise<unknown> {
		return await this.queryBus.execute(new IdQuery(id));
	}
}
