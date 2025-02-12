import { Inject, Injectable } from '@nestjs/common';
import {
	ApiResponse,
	Authorizer,
	AuthToken,
	User,
} from '@authorizerdev/authorizer-js';
import { ProfilePresenter } from '../presenter/profile.presenter';
import { LoginPresenter } from '../presenter/login.presenter';

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

	async login(email: string, password: string): Promise<unknown> {
		const data = await this.instance.login({
			email: email,
			password: password,
		});
		const presenter = new LoginPresenter(data);
		return presenter.transform();
	}

	async register(
		email: string,
		username: string,
		password: string,
	): Promise<unknown> {
		const data = await this.instance.signup({
			email,
			password,
			confirm_password: password,
			nickname: username,
			roles: ['User'],
		});
		const presenter = new LoginPresenter(data);
		return presenter.transform();
	}

	async reset(email: string): Promise<unknown> {
		const data = await this.instance.forgotPassword({
			email,
		});
		return data;
	}

	async profile(token: string): Promise<unknown> {
		const data = await this.instance.getProfile({
			Authorization: `Bearer ${token}`,
		});
		const presenter = new ProfilePresenter(data);
		return presenter.transform();
	}
}
