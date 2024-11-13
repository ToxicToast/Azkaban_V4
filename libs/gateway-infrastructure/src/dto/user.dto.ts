import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export interface UserByIdDTO {
	id: string;
}

export interface CreateUserDTO {
	email: string;
	username: string;
	password: string;
}

export interface UpdateUserDTO {
	id: string;
	username?: Optional<string>;
	password?: Optional<string>;
	activated_at?: Optional<Nullable<Date>>;
	otp_secret?: Optional<Nullable<string>>;
}

export interface DeleteUserDTO {
	id: string;
}

export interface RestoreUserDTO {
	id: string;
}
