import { Nullable, Optional } from '@azkaban/shared';

export interface CreateUserDTO {
	username: string;
	email: string;
	password: string;
	salt: string;
}

export type CreateUserWithoutSaltDTO = Omit<CreateUserDTO, 'salt'>;

export interface UpdateUserDTO {
	username?: string;
	email?: string;
	password?: string;
	salt?: string;
	loggedin_at?: Optional<Nullable<Date>>;
}
