import { Response } from '@azkaban/shared';

export interface UserModel {
	id: string;
	username: string;
	email: string;
	isActive: boolean;
	isBanned: boolean;
	isLoggedIn: boolean;
}

export type UsersResponse = Response<Array<UserModel>>;
export type UserResponse = Response<UserModel>;
