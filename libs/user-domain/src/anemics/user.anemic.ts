import { Anemic, Nullable } from '@azkaban/shared';

export interface UserAnemic extends Anemic {
	readonly username: string;
	readonly email: string;
	readonly password: string;
	readonly salt: string;
	readonly banned_at: Nullable<Date>;
	readonly activated_at: Nullable<Date>;
	readonly loggedin_at: Nullable<Date>;
}
