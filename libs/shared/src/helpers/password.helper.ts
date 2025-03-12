import * as argon2 from 'argon2';

export async function PasswordHash(
	password: string,
	secret: string,
): Promise<string> {
	const salt = Buffer.from(secret, 'base64');

	return argon2.hash(password, {
		salt,
	});
}
