import { Nullable } from '@azkaban/shared';

export interface UserDAO {
	id: number;
	user_id: string;
	username: string;
	email: string;
	password: string;
	salt: string;
	loggedin_at: Nullable<Date>;
	activated_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
}
