import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { IdCommand, ListCommand } from './commands';

@Injectable()
export class CharacterService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly eventBus: EventBus,
	) {}

	async characterList(): Promise<Array<unknown>> {
		return await this.commandBus
			.execute(new ListCommand())
			.then((res: Array<unknown>) => {
				// publish
				return res;
			});
	}

	async characterById(id: string): Promise<unknown> {
		return await this.commandBus
			.execute(new IdCommand(id))
			.then((res: Array<unknown>) => {
				// publish
				return res;
			});
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
	): Promise<unknown> {
		//
		return null;
	}
}
