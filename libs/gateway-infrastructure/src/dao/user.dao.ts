import { Nullable } from '@toxictoast/azkaban-base-types';

export interface UserDAO {
	id: string;
	username: string;
	email: string;
	password: string;
	token: Nullable<string>;
	otp_secret: Nullable<string>;
	activated_at: Nullable<Date>;
	loggedin_at: Nullable<Date>;
	created_at: Date;
	updated_at: Nullable<Date>;
	deleted_at: Nullable<Date>;
	isActive: boolean;
	isUpdated: boolean;
	isDeleted: boolean;
}
