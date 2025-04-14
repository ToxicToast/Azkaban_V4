import { Nullable, Optional } from '@azkaban/shared';

export interface CreateGuildDTO {
	region: string;
	realm: string;
	name: string;
}

export interface UpdateGuildDTO {
	faction?: Optional<Nullable<string>>;
	member_count?: Optional<number>;
	raid?: Optional<Nullable<string>>;
}
