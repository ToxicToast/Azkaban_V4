import { Nullable } from '@azkaban/shared';

export interface AuthModel {
	user: Nullable<{
		id: string;
		username: string;
		email: string;
		isActive: boolean;
		isBanned: boolean;
		isLoggedIn: boolean;
		isFlagged: boolean;
	}>;
	isAdmin: boolean;
}
