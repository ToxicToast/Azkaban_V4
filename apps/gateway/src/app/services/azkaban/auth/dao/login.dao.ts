export interface LoginDAO {
	access_token: string;
	user: {
		id: string;
		username: string;
		email: string;
		isActive: boolean;
		isBanned: boolean;
		isLoggedIn: boolean;
		isFlagged: boolean;
	};
	permissions: {
		isAdmin: boolean;
	};
}
