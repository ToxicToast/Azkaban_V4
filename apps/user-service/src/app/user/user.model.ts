export interface UserModel {
	id: string;
	username: string;
	email: string;
	isActive: boolean;
	isBanned: boolean;
	isLoggedIn: boolean;
	isFlagged: boolean; // Should be deactivated because last login is longer than 3 months
}

export type UsersResponse = Array<UserModel>;
export type UserResponse = UserModel;
