import { Nullable } from '@azkaban/shared';

export interface GroupData {
	readonly id: string;
	readonly name: string;
	readonly created_at: Date;
	readonly updated_at: Nullable<Date>;
	readonly deleted_at: Nullable<Date>;
}
