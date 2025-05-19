import { CreateCharacterDTO } from '@azkaban/warhammer-infrastructure';

export class CreateCommand {
	constructor(public readonly data: CreateCharacterDTO) {}
}
