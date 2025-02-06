import { Inject, Injectable } from '@nestjs/common';
import {
	ApiResponse,
	Authorizer,
	AuthToken,
	User,
} from '@authorizerdev/authorizer-js';

@Injectable()
export class AuthService {
	private readonly instance: Authorizer;

	constructor(
		@Inject('AUTHORIZER_URL') private readonly url: string,
		@Inject('AUTHORIZER_CLIENT_ID') private readonly clientId: string,
	) {
		this.instance = new Authorizer({
			authorizerURL: url,
			clientID: clientId,
			redirectURL: 'https://www.toxictoast.de',
		});
	}

	async login(
		email: string,
		password: string,
	): Promise<ApiResponse<AuthToken>> {
		const data = await this.instance.login({
			email: email,
			password: password,
		});
		return data;
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<ApiResponse<AuthToken>> {
		const data = await this.instance.signup({
			email,
			password,
			confirm_password: password,
			nickname: username,
			roles: ['User'],
		});
		return data;
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

	async profile(token: string): Promise<ApiResponse<User>> {
		const data = await this.instance.getProfile({
			Authorization: `Bearer ${token}`,
		});
		return data;
	}
}
