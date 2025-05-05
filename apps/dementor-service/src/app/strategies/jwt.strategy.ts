import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from '../../config';
import { UserDAO } from '@azkaban/azkaban-infrastructure';
import { Chainable } from '@azkaban/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: AppConfig.jwt,
		});
	}

	async validate(payload: Chainable<Partial<UserDAO>, { sub: string }>) {
		Logger.log('Validating JWT', { payload });
		return {
			id: payload.id,
			username: payload.username,
			email: payload.email,
		};
	}
}
