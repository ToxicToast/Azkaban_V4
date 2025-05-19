import { UpdateCharacterDTO } from '@azkaban/warhammer-infrastructure';

export class UpdateCommand {
	constructor(
		public readonly id: number,
		public readonly data: UpdateCharacterDTO,
	) {}
}
