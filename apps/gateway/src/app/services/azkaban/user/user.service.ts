import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IdQuery, ListQuery } from './queries';
import { UserDAO } from '@azkaban/user-infrastructure';
import { CreateCommand } from './commands';

@Injectable()
export class UserService {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus,
	) {}

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
		return await this.commandBus.execute(
			new CreateCommand(username, email, password),
		);
	}
}
