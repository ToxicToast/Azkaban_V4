import { UpdateGuildDTO } from '@azkaban/warcraft-infrastructure';

export class UpdateCommand {
	constructor(
		public readonly id: number,
		public readonly data: UpdateGuildDTO,
	) {}
}
