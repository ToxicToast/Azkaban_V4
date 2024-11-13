import { Injectable } from '@nestjs/common';
import { Kafka2FAService, UserDAO } from '@azkaban/gateway-infrastructure';
import { Response } from 'express';

@Injectable()
export class TwoFactorService {
	constructor(private readonly client: Kafka2FAService) {}

	async onGenerateSecret(user: UserDAO) {
		return await this.client.onGenerateSecret(user);
	}

	async onGenerate(response: Response, othAuthUrl: string) {
		return await this.client.generateQRCode(response, othAuthUrl);
	}

	async onVerify(code: string, user: UserDAO) {
		return await this.client.onVerify(code, user);
	}
}
