import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(err, user, info, context: ExecutionContext) {
		Logger.log('Handle Request', { err, user, info });
		return user ?? null;
	}
}
