import { Injectable } from '@nestjs/common';
import { JwtHelper } from '@toxictoast/sleepyazkaban-base-helpers';
import { JwtAdapter, JwtPayload } from '@toxictoast/sleepyazkaban-base-domain';

@Injectable()
export class JwtService implements JwtAdapter {
	private readonly helper: JwtHelper;

	constructor() {
		this.helper = new JwtHelper();
	}

	checkToken(token: string): Promise<object> {
		return this.helper.checkToken(token);
	}
	createToken(payload: JwtPayload): string {
		return this.helper.createToken(payload);
	}
}
