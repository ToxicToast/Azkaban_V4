import { Nullable } from '../types';

export interface Anemic {
	readonly id: number;
	readonly created_at: Date;
	readonly updated_at: Nullable<Date>;
	readonly deleted_at: Nullable<Date>;
}
