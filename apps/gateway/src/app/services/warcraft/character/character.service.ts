import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommand, IdCommand, ListCommand } from './commands';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

@Injectable()
export class CharacterService {
	constructor(private readonly commandBus: CommandBus) {}

	async characterList(): Promise<Array<CharacterDAO>> {
		return await this.commandBus.execute(new ListCommand());
	}

	async characterById(id: string): Promise<CharacterDAO> {
		return await this.commandBus.execute(new IdCommand(id));
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterDAO> {
		return await this.commandBus.execute(
			new CreateCommand(region, realm, name),
		);
	}
}
