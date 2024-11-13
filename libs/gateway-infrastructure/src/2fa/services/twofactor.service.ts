import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { UserDAO } from '../../dao';

@Injectable()
export class AzkabanTwoFactorService {
	constructor(
		@Inject('TWO_FACTOR_AUTHENTICATION_APP_NAME')
		private readonly appName: string,
		@Inject('TWO_FACTOR_AUTHENTICATION_APP_SECRET_LENGTH')
		private readonly appSecretLength: number,
	) {}

	async generateSecret(user: UserDAO) {
		const secret = authenticator.generateSecret(this.appSecretLength);
		const otpAuthUrl = authenticator.keyuri(
			user.email,
			this.appName,
			secret,
		);
		return { secret, otpAuthUrl };
	}

	async generateQRCode(stream: Response, otpAuthUrl: string) {
		return toFileStream(stream, otpAuthUrl);
	}

	async verifyCode(code: string, user: UserDAO) {
		if (user.otp_secret !== null) {
			return authenticator.verify({
				token: code,
				secret: user.otp_secret,
			});
		}
		return false;
	}
}
