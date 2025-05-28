import { Nullable } from '@azkaban/shared';

export class AssignCommand {
	constructor(
		public readonly id: number,
		public readonly user_id: Nullable<string>,
	) {}
}
