export interface LoginDAO {
	user: {
		id: string;
		username: string;
	};
	groups: Array<string>;
}
