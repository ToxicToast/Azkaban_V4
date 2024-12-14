import { Injectable } from '@nestjs/common';
import {
	BcryptAdapter,
	JwtAdapter,
	KafkaAdapter,
	LoggerAdapter,
} from '@toxictoast/sleepyazkaban-base-domain';
import { AuthEvents } from '@toxictoast/sleepyazkaban-kafka';

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly loggerService: LoggerAdapter,
		private readonly jwtService: JwtAdapter,
		private readonly kafkaService: KafkaAdapter,
		private readonly bcryptService: BcryptAdapter,
	) {}

	private generateToken(username: string): string {
		this.loggerService.debug(`Generate Token for ${username}.`);
		return this.jwtService.createToken({
			username,
		});
	}

	private onLogin(username: string): void {
		this.loggerService.debug(`User ${username} logged in.`);
		this.kafkaService.emitEvent(AuthEvents.LOGIN_SUCCESSFUL, {
			username,
		});
	}

	async execute(email: string, password: string): Promise<string> {
		this.loggerService.debug(
			`The user with email "${email}" tries to login with "${password}".`,
		);
		this.onLogin(email);
		return this.generateToken(email);
	}
}

/*
constructor(
		private readonly logger: LoggerAdapter,
		private readonly hashService: BcryptAdapter,
		private readonly jwtService: JwtAdapter,
		private readonly authService: AuthService,
		private readonly kafkaService: KafkaAdapter,
	) {}

	private generateToken(user: AuthAnemic): string {
		return this.jwtService.createToken({
			username: user.email,
		});
	}

	private emitLoginEvent(user: AuthAnemic): void {
		const { id, username, email } = user;
		this.kafkaService.emitEvent(AuthEvents.LOGIN_SUCCESSFUL, {
			id,
			username,
			email,
		});
	}

	async execute(email: string, password: string): Promise<string> {
		this.logger.debug(`The user with email "${email}" tries to login.`);
		const emailResult = await this.authService.findByEmail(email);
		if (emailResult.isSuccess) {
			const hashedPassword =
				await this.hashService.generateHash(password);
			const isPasswordCorrect = await this.hashService.compareHashes(
				hashedPassword,
				emailResult.value.password,
			);
			if (isPasswordCorrect) {
				this.emitLoginEvent(emailResult.value);
				return this.generateToken(emailResult.value);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
 */
