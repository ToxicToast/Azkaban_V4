import { Nullable } from '@azkaban/shared';

export interface CharacterDAO {
	id: number;
	character_id: string;
	name: string;
	role: string;
	current_fate: number;
	total_fate: number;
	current_wounds: number;
	total_wounds: number;
	critical_wounds: number;
	current_corruption: number;
	total_corruption: number;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
