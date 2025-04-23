import { Nullable, Optional } from '@azkaban/shared';

export interface UserData {
	readonly user_id: string;
	readonly username: string;
	readonly email: string;
	readonly password: string;
	readonly salt: string;
}

export interface UpdateUserData {
	readonly id: number;
	readonly username?: Optional<string>;
	readonly email?: Optional<string>;
	readonly password?: Optional<string>;
	readonly salt?: Optional<string>;
	readonly loggedin_at?: Optional<Nullable<Date>>;
}
