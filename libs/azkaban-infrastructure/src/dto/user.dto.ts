import { Nullable, Optional } from '@azkaban/shared';

export interface CreateUserDTO {
	username: string;
	email: string;
	password: string;
	salt: string;
}

export interface UpdateUserDTO {
	username?: string;
	email?: string;
	password?: string;
	salt?: string;
	loggedin_at?: Optional<Nullable<Date>>;
}
