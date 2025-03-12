import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRoutes } from '@azkaban/shared';
import { LoginDAO, RegisterDAO, ForgetPasswordDAO } from './dao';
import { LoginDTO, RegisterDTO, ForgetPasswordDTO } from './dto';
import { JwtService } from '@nestjs/jwt';

@Controller({
	path: AuthRoutes.CONTROLLER,
	version: '1',
})
export class AuthController {
	constructor(
		private readonly service: AuthService,
		private readonly jwtService: JwtService,
	) {}

	@Post(AuthRoutes.LOGIN)
	async login(@Body() body: LoginDTO): Promise<LoginDAO> {
		const data = await this.service.login(body);
		const payload = {
			sub: data.user.id,
			user: data.user,
			isAdmin: data.isAdmin,
		};
		return {
			access_token: this.jwtService.sign(payload),
			user: data.user,
			isAdmin: data.isAdmin,
		};
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
}
