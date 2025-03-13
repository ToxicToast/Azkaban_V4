import { Nullable } from '@azkaban/shared';

interface UserModel {
	id: string;
	username: string;
	email: string;
	isActive: boolean;
	isBanned: boolean;
	isLoggedIn: boolean;
	isFlagged: boolean;
}

export interface AuthModel {
	user: Nullable<UserModel>;
	permissions: {
		isAdmin: boolean;
	};
}
