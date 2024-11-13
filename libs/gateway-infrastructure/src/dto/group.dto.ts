import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export interface GroupByIdDTO {
	id: string;
}

export interface CreateGroupDTO {
	title: string;
}

export interface UpdateGroupDTO {
	id: string;
	title: string;
	activated_at?: Optional<Nullable<Date>>;
}

export interface DeleteGroupDTO {
	id: string;
}

export interface RestoreGroupDTO {
	id: string;
}
