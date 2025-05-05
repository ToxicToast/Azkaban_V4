import { Nullable, Optional } from '@azkaban/shared';

export interface GuildList {
	limit?: Optional<number>;
	offset?: Optional<number>;
}

export interface GuildByIdDTO {
	id: number;
}

export interface GuildByGuildIdDTO {
	guild_id: string;
}

export interface GuildCreateDTO {
	region: string;
	realm: string;
	name: string;
}

export interface GuildUpdateDTO {
	id: number;
	data?: {
		faction?: Optional<Nullable<string>>;
		member_count?: Optional<number>;
		raid?: Optional<Nullable<string>>;
	};
}
