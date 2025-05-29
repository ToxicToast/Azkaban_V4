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
			ignoreExpiration: false,
			secretOrKey: AppConfig.jwt,
		});
	}

	async validate(
		payload: Chainable<Partial<UserDAO>, { sub: string; exp: number }>,
	) {
		Logger.log('Validating JWT', { payload });
		const timestampNow = Math.floor(Date.now() / 1000);
		if (payload.exp < timestampNow) {
			Logger.warn('JWT expired', { payload });
			return null;
		}
		return {
			id: payload.id,
			username: payload.username,
			email: payload.email,
		};
	}
}
