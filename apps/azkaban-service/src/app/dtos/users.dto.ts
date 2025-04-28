import { Nullable, Optional } from '@azkaban/shared';

export interface UsersListDTO {
	limit?: Optional<number>;
	offset?: Optional<number>;
}

export interface UserByIdDTO {
	id: number;
}

export interface UserByUserIdDTO {
	user_id: string;
}

export interface UserCreateDTO {
	username: string;
	email: string;
	password: string;
	salt: string;
}

export interface UserUpdateDTO {
	id: number;
	data?: {
		username?: Optional<string>;
		email?: Optional<string>;
		password?: Optional<string>;
		salt?: Optional<string>;
		loggedin_at?: Optional<Nullable<Date>>;
	};
}
