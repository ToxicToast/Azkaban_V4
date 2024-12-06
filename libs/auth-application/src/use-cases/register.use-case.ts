import { Injectable } from '@nestjs/common';
import { AuthService } from '@azkaban/auth-domain';
import { HashHelper } from '@toxictoast/sleepyazkaban-base-helpers';

@Injectable()
export class RegisterUseCase {
	constructor(
		private readonly authService: AuthService,
		private readonly hasher: HashHelper,
	) {}

	async execute(email: string, username: string, password: string) {}
}
