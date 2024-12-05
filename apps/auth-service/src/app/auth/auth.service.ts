import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventEmitterHelper } from '@toxictoast/sleepyazkaban-base-helpers';
import { AuthEvents } from '@toxictoast/sleepyazkaban-kafka';

@Injectable()
export class AuthService {
	private readonly eventEmitter: EventEmitterHelper;

	constructor(private readonly emitter: EventEmitter2) {
		this.eventEmitter = new EventEmitterHelper(this.emitter);
	}

	onRegisterSuccessful(id: string, username: string): void {
		this.eventEmitter.emitEvent(AuthEvents.REGISTER_SUCCESSFUL, {
			id,
			username,
		});
	}

	onRegisterFailed(username: string, email: string): void {
		this.eventEmitter.emitEvent(AuthEvents.REGISTER_FAILED, {
			username,
			email,
		});
	}

	onLoginSuccessful(id: string, username: string): void {
		this.eventEmitter.emitEvent(AuthEvents.LOGIN_SUCCESSFUL, {
			id,
			username,
		});
	}

	onLoginFailed(username: string): void {
		this.eventEmitter.emitEvent(AuthEvents.LOGIN_FAILED, {
			username,
		});
	}
}
