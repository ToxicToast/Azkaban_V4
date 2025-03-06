import * as bcrypt from 'bcrypt';

export function PasswordHash(password: string): string {
	return bcrypt.hashSync(password, 10);
}
