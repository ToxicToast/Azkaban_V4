import {
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor() {
		super();
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
	): TUser {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		const request = context.switchToHttp().getRequest();
		request.headers['x-user-id'] = user.id;
		request['user'] = user;
		return user;
	}
}
