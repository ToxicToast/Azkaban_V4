import {
	CanActivate,
	ExecutionContext,
	Logger,
	mixin,
	Type,
} from '@nestjs/common';

export const PermissionGuard = (permission: string): Type<CanActivate> => {
	class PermissionGuardMixin {
		async canActivate(context: ExecutionContext) {
			// await super.canActivate(context);
			const request = context.switchToHttp().getRequest();
			const user = request.user;
			Logger.debug({ user });
			return user?.permissions?.includes(permission) ?? true;
		}
	}

	return mixin(PermissionGuardMixin);
};
