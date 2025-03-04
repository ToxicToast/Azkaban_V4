import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CreateQuery, IdQuery, ListQuery } from './queries';
import { UserDAO } from '@azkaban/user-infrastructure';
import { Nullable, Response } from '@azkaban/shared';

@Injectable()
export class UserService {
	constructor(private readonly queryBus: QueryBus) {}

	async userList(): Promise<Array<UserDAO>> {
		return await this.queryBus.execute(new ListQuery());
	}

	async userById(id: string): Promise<UserDAO> {
		return await this.queryBus.execute(new IdQuery(id));
	}

	async createUser(
		username: string,
		email: string,
		password: string,
	): Promise<UserDAO> {
		return await this.queryBus.execute(
			new CreateQuery(username, email, password),
		);
	}
}
