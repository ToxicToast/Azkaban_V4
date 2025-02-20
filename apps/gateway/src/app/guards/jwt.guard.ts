import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Optional } from '@azkaban/shared';

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	private extractTokenFromHeader(request: Request): Optional<string> {
		const authorization = request.headers.authorization ?? '';
		const [type, token] = authorization.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}

	private checkExpireTime(expireTime: number): void {
		const currentTime = Date.now();
		if (currentTime >= expireTime) {
			throw new UnauthorizedException();
		}
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.decode(token);
			this.checkExpireTime(payload.exp * 1000);
			request['user'] = payload;
			request['token'] = token;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}
}
