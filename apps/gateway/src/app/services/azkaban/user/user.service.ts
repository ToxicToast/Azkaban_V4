import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { UserDAO } from '@azkaban/user-infrastructure';
import { CreateCommand, IdCommand, ListCommand } from './commands';
import { ListEvent } from './events';

@Injectable()
export class UserService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly eventBus: EventBus,
	) {}

	async userList(): Promise<Array<UserDAO>> {
		return await this.commandBus
			.execute(new ListCommand())
			.then((res: Array<UserDAO>) => {
				this.eventBus.publish(new ListEvent(res));
				return res;
			});
	}

	async userById(id: string): Promise<UserDAO> {
		return await this.commandBus.execute(new IdCommand(id));
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
