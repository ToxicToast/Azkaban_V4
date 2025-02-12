import { ApiResponse, User } from '@authorizerdev/authorizer-js';

export class ProfilePresenter {
	constructor(public readonly user: ApiResponse<User>) {}

	public transform() {
		return {
			data: {
				id: this.user.data.id,
				email: this.user.data.email,
				username: this.user.data?.nickname ?? null,
				avatar: this.user.data?.picture ?? null,
				roles: this.user.data?.roles ?? [],
			},
			error: this.user.errors,
		};
	}
}
