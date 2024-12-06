import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller({
	path: 'auth',
	version: '1',
})
export class AuthController {
	private readonly logger: Logger = new Logger(AuthController.name);

	constructor(private readonly service: AuthService) {}

	@Post('register')
	async register(@Body() body: RegisterDTO): Promise<unknown> {
		return this.service.register(body);
	}

	@Post('login')
	async login(@Body() body: LoginDTO): Promise<unknown> {
		return this.service.login(body);
	}

	@Post('logout')
	async logout(): Promise<void> {
		this.logger.debug({});
	}
}
