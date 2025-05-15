import {
	ExecutionContext,
	Injectable,
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
		if (token) {
			const decoded = this.jwtService.verify(token);
			request['user'] = decoded;
		}
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
		return user;
	}
}
