import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LoginDAO, RegisterDAO } from './auth.dao';

@Controller({
	path: 'auth',
	version: '1',
})
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post('login')
	async login(@Body() body: LoginDTO): Promise<LoginDAO> {
		return await this.service.login(body);
	}

	@Post('register')
	async register(@Body() body: RegisterDTO): Promise<RegisterDAO> {
		return await this.service.register(body);
	}
}
