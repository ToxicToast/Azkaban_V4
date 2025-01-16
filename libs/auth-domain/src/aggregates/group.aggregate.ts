import { Domain, Nullable } from '@azkaban/shared';
import { GroupAnemic } from '../anemics';

export class GroupAggregate implements Domain<GroupAnemic> {
	constructor(
		private readonly id: string,
		private name: string,
		private readonly created_at: Date,
		private updated_at: Nullable<Date>,
		private deleted_at: Nullable<Date>,
	) {}

	isUpdated(): boolean {
		return !!this.updated_at;
	}

	isDeleted(): boolean {
		return !!this.deleted_at;
	}

	toAnemic(): GroupAnemic {
		return {
			id: this.id,
			name: this.name,
			created_at: this.created_at,
			updated_at: this.updated_at,
			deleted_at: this.deleted_at,
			isUpdated: this.isUpdated(),
			isDeleted: this.isDeleted(),
		};
	}

	updateName(name: string): void {
		if (name !== this.name) {
			this.name = name;
			this.updated_at = new Date();
		}
	}
}
