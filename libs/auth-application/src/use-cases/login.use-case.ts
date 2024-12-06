import { Injectable } from '@nestjs/common';
import { HashHelper } from '@toxictoast/sleepyazkaban-base-helpers';
import { AzkabanAuthInvalidCredentialsException } from '@toxictoast/sleepyazkaban-base-errors';

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly authService: AuthService,
		private readonly hasher: HashHelper,
	) {}

	async execute(email: string, password: string): Promise<AuthAnemic> {
		const emailResult = await this.authService.findByEmail(email);
		if (emailResult.isSuccess) {
			const hashedPassword = await this.hasher.generateHash(password);
			const isPasswordCorrect = await this.hasher.compareHashes(
				hashedPassword,
				emailResult.value.password,
			);
			if (isPasswordCorrect) {
				return emailResult.value;
			} else {
				throw AzkabanAuthInvalidCredentialsException(
					'Invalid credentials',
				);
			}
		} else {
			throw AzkabanAuthInvalidCredentialsException('Invalid credentials');
		}
	}
}
