import { Injectable } from '@nestjs/common';
import { HashHelper } from '@toxictoast/sleepyazkaban-base-helpers';
import { BcryptAdapter } from '@toxictoast/sleepyazkaban-base-domain';

@Injectable()
export class BcryptService implements BcryptAdapter {
	private readonly bcryptHelper: HashHelper;

	constructor() {
		this.bcryptHelper = new HashHelper();
	}

	generateSalt(length: number): Promise<string> {
		return this.bcryptHelper.generateSalt(length);
	}

	generateHash(hashString: string): Promise<string> {
		return this.generateHash(hashString);
	}

	compareHashes(a: string, b: string): Promise<boolean> {
		return this.compareHashes(a, b);
	}
}
