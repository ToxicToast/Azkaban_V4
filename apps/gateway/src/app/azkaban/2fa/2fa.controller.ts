import {
	Body,
	Controller,
	HttpException,
	Logger,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { TwoFactorService } from './2fa.service';
import {
	PermissionGuard,
	RequestDAO,
	TwoFactorPermissions,
	UserDAO,
} from '@azkaban/gateway-infrastructure';

@Controller('2fa')
export class TwoFactorController {
	constructor(private readonly service: TwoFactorService) {}

	@Post('generate')
	@UseGuards(PermissionGuard(TwoFactorPermissions.CAN_GENERATE))
	async generate(@Res() response: Response, @Req() request: RequestDAO) {
		const user = request?.user ?? ({} as UserDAO);
		const othAuthObject = await this.service.onGenerateSecret(user);
		Logger.debug({ othAuthObject });
		return await this.service
			.onGenerate(response, 'othAuthObject.othAuthUrl')
			.catch((error) => {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			});
	}

	@Post('verify')
	@UseGuards(PermissionGuard(TwoFactorPermissions.CAN_VERIFY))
	async verify(@Body('code') code: string, @Req() request: RequestDAO) {
		const user = request?.user;
		return await this.service.onVerify(code, user).catch((error) => {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		});
	}
}
