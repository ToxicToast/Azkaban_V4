import { Injectable } from '@nestjs/common';
import { AuthAnemic, AuthService } from '@azkaban/auth-domain';
import {
	BcryptAdapter,
	KafkaAdapter,
	LoggerAdapter,
} from '@toxictoast/sleepyazkaban-base-domain';
import { AuthEvents } from '@toxictoast/sleepyazkaban-kafka';

@Injectable()
export class RegisterUseCase {
	constructor(
		private readonly logger: LoggerAdapter,
		private readonly hashService: BcryptAdapter,
		private readonly authService: AuthService,
		private readonly kafkaService: KafkaAdapter,
	) {}

	private emitRegisterEvent(user: AuthAnemic): void {
		const { id, username, email } = user;
		this.kafkaService.emitEvent(AuthEvents.REGISTER_SUCCESSFUL, {
			id,
			username,
			email,
		});
	}

	async execute(
		email: string,
		username: string,
		password: string,
	): Promise<AuthAnemic> {
		this.logger.debug(
			`The user with email "${email}" and username "${username}" tries to register.`,
		);
		const checkUser = await this.authService.findUser(email, username);
		if (checkUser.isFailure) {
			const hashedPassword =
				await this.hashService.generateHash(password);
			const result = await this.authService.createUser(
				email,
				username,
				hashedPassword,
			);
			if (result.isSuccess) {
				this.emitRegisterEvent(result.value);
				return result.value;
			}
			return null;
		}
		return null;
	}
}
