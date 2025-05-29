import { Nullable } from '@azkaban/shared';

export interface CharacterDAO {
	id: number;
	character_id: string;
	user_id: Nullable<string>;
	name: string;
	role: string;
	fate: {
		current: number;
		total: number;
	};
	wounds: {
		current: number;
		total: number;
		critical: number;
	};
	corruption: {
		current: number;
		total: number;
	};
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
