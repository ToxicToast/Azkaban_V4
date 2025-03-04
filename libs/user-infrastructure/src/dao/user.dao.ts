import { Nullable } from '@azkaban/shared';

export interface UserDAO {
	id: string;
	username: string;
	email: string;
	password: string;
	activated_at: Nullable<Date>;
	banned_at: Nullable<Date>;
	loggedin_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
