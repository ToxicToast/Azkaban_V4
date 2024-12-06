import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/sleepyazkaban-kafka';
import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller({
	version: '1',
	path: 'auth',
})
export class AuthController {
	private readonly logger: Logger = new Logger(AuthController.name);

	constructor(private readonly service: AuthService) {}

	@MessagePattern(AuthTopics.LOGIN)
	async login(@Payload() payload: LoginDTO) {
		return payload;
	}

	@MessagePattern(AuthTopics.REGISTER)
	async register(@Payload() payload: RegisterDTO) {
		return payload;
	}
}
