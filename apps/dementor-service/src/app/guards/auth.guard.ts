import {
	ExecutionContext,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly jwtService: JwtService) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();
		const token = request.headers['authorization'];
		Logger.log('Token', { token });
		if (token) {
			try {
				const decoded = this.jwtService.verify(token);
				request['user'] = decoded;
				Logger.log('Decoded JWT:', decoded);
				Logger.log('Attached User:', request['user']);
			} catch (error) {
				Logger.error(error);
				return false;
			}
		}
		return super.canActivate(context);
	}

	handleRequest<TUser = any>(
		err: any,
		user: any,
		info: any,
		context: ExecutionContext,
	): TUser {
		Logger.log('Handle Request', { err, user, info });
		if (err || !user) {
			throw err || new UnauthorizedException();
		}

		const request = context.switchToHttp().getRequest();
		request.headers['x-user-id'] = user.id;
		return user;
	}
}
