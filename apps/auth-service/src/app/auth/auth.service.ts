import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	async login(email: string, password: string): Promise<void> {
		//
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<void> {
		//
	}

	async reset(email: string): Promise<void> {
		//
	}
}
