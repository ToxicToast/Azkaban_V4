export interface RegisterDTO {
	email: string;
	username: string;
	password: string;
}

export interface LoginDTO {
	username: string;
	password: string;
}

export interface ForgotPasswordDTO {
	email: string;
}
