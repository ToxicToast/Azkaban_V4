import { CreateGuildDTO } from '@azkaban/warcraft-infrastructure';

export class CreateCommand {
	constructor(public readonly data: CreateGuildDTO) {}
}
