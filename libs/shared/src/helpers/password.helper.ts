import * as bcrypt from 'bcrypt';

export async function PasswordHash(
	password: string,
	salt: string,
): Promise<string> {
	return bcrypt.hash(password, salt);
}

export async function PasswordSalt(): Promise<string> {
	return await bcrypt.genSalt(10);
}

export async function PasswordCompare(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}
