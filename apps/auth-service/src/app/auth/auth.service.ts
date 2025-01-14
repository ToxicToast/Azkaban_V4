import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(@Inject('APP_VERSION') private readonly version: string) {}

	appVersion(): string {
		return this.version;
	}

	async login(username: string, password: string): Promise<unknown> {
		return {
			user: {
				id: 'TEST-ID',
				username: username,
				pasword: password,
			},
		};
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<unknown> {
		return {
			user: {
				id: 'TEST-ID',
				email: email,
				username: username,
				pasword: password,
			},
		};
	}

	async reset(email: string, username: string): Promise<unknown> {
		return {
			user: {
				id: 'TEST-ID',
				email: email,
				username: username,
			},
		};
	}
}
