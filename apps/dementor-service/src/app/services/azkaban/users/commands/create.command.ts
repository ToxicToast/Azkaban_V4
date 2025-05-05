import { CreateUserWithoutSaltDTO } from '@azkaban/azkaban-infrastructure';

export class CreateCommand {
	constructor(public readonly data: CreateUserWithoutSaltDTO) {}
}
