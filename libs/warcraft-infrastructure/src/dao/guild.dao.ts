import { Nullable } from '@azkaban/shared';

export interface GuildDAO {
	id: number;
	guild_id: string;
	region: string;
	realm: string;
	name: string;
	faction: Nullable<string>;
	member_count: number;
	raid: Nullable<string>;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
