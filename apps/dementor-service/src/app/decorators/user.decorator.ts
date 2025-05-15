import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		Logger.log('User decorator called', { data });
		const request = ctx.switchToHttp().getRequest();
		if (!request.user) {
			Logger.error('User not found in request');
			return null;
		}
		return request.user;
	},
);
