import { MessagePattern } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/sleepyazkaban-kafka';
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({
	version: '1',
	path: 'auth',
})
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@MessagePattern(AuthTopics.LOGIN)
	async login() {
		return null;
	}

	@MessagePattern(AuthTopics.REGISTER)
	async register() {
		return null;
	}
}
