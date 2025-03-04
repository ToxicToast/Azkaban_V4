import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IdQuery, ListQuery } from './queries';
import { UserDAO } from '@azkaban/user-infrastructure';
import { Nullable } from '@azkaban/shared';

@Injectable()
export class UserService {
	constructor(private readonly queryBus: QueryBus) {}

	async userList(): Promise<Array<UserDAO>> {
		return await this.queryBus.execute(new ListQuery());
	}

	async userById(id: string): Promise<Nullable<UserDAO>> {
		return await this.queryBus.execute(new IdQuery(id));
	}
}
