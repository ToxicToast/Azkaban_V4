import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRoutes } from '@azkaban/shared';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { LoginDTO, RegisterDTO, ForgetPasswordDTO } from './dto';
import { JwtGuard } from '../../../guards';

@Controller({
	path: AuthRoutes.CONTROLLER,
	version: '1',
})
export class AuthController {
	constructor(private readonly service: AuthService) {}

	@Post(AuthRoutes.LOGIN)
	async login(@Body() body: LoginDTO): Promise<LoginDAO> {
		return await this.service.login(body);
	}

	@Post(AuthRoutes.REGISTER)
	async register(@Body() body: RegisterDTO): Promise<RegisterDAO> {
		return await this.service.register(body);
	}

	@Post(AuthRoutes.FORGET_PASSWORD)
	async forgetPassword(
		@Body() body: ForgetPasswordDTO,
	): Promise<ForgetPasswordDAO> {
		return await this.service.forgetPassword(body);
	}

	@UseGuards(JwtGuard)
	@Get(AuthRoutes.PROFILE)
	async profile(@Req() request): Promise<unknown> {
		const token = request['token'];
		return await this.service.profile(token);
	}
}
