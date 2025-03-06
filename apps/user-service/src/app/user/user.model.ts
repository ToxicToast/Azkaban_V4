export interface UserModel {
	id: string;
	username: string;
	email: string;
	isActive: boolean;
	isBanned: boolean;
	isLoggedIn: boolean;
}

export type UsersResponse = Array<UserModel>;
export type UserResponse = UserModel;
