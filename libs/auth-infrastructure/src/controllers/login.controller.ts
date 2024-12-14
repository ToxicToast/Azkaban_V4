import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginUseCase } from '../use-cases';
import { UseCaseProxy } from '@toxictoast/sleepyazkaban-base-helpers';
import { LoginDTO } from '../dto/login.dto';

@Controller({
	path: 'auth/login',
	version: '1',
})
export class LoginController {
	constructor(
		@Inject(LoginUseCase.name)
		private readonly useCase: UseCaseProxy<LoginUseCase>,
	) {}

	@Post()
	async login(@Body() body: LoginDTO) {
		return this.useCase.getInstance().execute(body.email, body.password);
	}
}
