import { AuthRepository } from '../repositories';
import { Result } from '@toxictoast/sleepyazkaban-base-helpers';
import { AuthAnemic } from '../anemics';

export class AuthService {
	constructor(private readonly repository: AuthRepository) {}

	async findByEmail(email: string) {
		try {
			const result = await this.repository.findByEmail(email);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}
}
