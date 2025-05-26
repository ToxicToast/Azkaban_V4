import { AuthGuard } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(err, user, info) {
		Logger.log('Handle Request', { err, user, info });
		return user ?? null;
	}
}
