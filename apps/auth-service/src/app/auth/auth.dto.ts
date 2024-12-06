import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	readonly username: string;

	@IsNotEmpty()
	readonly password: string;
}

export class LoginDTO {
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	readonly password: string;
}
