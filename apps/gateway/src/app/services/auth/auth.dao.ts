export interface LoginDAO {
	user: {
		id: string;
		username: string;
	};
	token: string;
}

export interface RegisterDAO {
	user: {
		id: string;
		username: string;
	};
}
