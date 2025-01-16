import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordDTO {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsNotEmpty()
	readonly username: string;
}
