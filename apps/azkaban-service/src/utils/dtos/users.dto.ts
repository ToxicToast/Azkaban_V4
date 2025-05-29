import { Nullable, Optional } from '@azkaban/shared';

export interface UsersListDTO {
	limit?: Optional<number>;
	offset?: Optional<number>;
	withDeleted?: Optional<boolean>;
}

export interface UserByIdDTO {
	id: number;
	withDeleted?: Optional<boolean>;
}

export interface UserByUserIdDTO {
	user_id: string;
	withDeleted?: Optional<boolean>;
}

export interface UserCreateDTO {
	data: {
		username: string;
		email: string;
		password: string;
		salt: string;
	};
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

export interface UserLoginDTO {
	data: {
		username: string;
		password: string;
	};
}
