import { ApiResponse, AuthToken } from '@authorizerdev/authorizer-js';

export class LoginPresenter {
	constructor(public readonly token: ApiResponse<AuthToken>) {}

	public transform() {
		return {
			data: {
				accessToken: this.token.data?.access_token ?? null,
				idToken: this.token.data?.id_token ?? null,
				refreshToken: this.token.data?.refresh_token ?? null,
				expiresIn: this.token.data?.expires_in ?? 0,
				user: {
					id: this.token.data?.user?.id ?? null,
					email: this.token.data?.user?.email ?? null,
					username: this.token.data?.user?.nickname ?? null,
					avatar: this.token.data?.user?.picture ?? null,
					roles: this.token.data?.user?.roles ?? [],
				},
				config: {
					shouldShowEmailOTP:
						this.token.data?.should_show_email_otp_screen ?? false,
					shouldShowMobileOTP:
						this.token.data?.should_show_mobile_otp_screen ?? false,
					shouldShowOTP:
						this.token.data?.should_show_totp_screen ?? false,
				},
			},
			error: this.token?.errors ?? [],
		};
	}
}
