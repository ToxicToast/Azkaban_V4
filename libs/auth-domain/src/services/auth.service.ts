import { AuthRepository } from '../repositories';
import { Result } from '@toxictoast/sleepyazkaban-base-helpers';
import { AuthAnemic } from '../anemics';
import { AuthFactory } from '../factories/auth.factory';

export class AuthService {
	private readonly factory: AuthFactory = new AuthFactory();

	constructor(private readonly repository: AuthRepository) {}

	async findByEmail(email: string) {
		try {
			const result = await this.repository.findByEmail(email);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async findByUsername(username: string) {
		try {
			const result = await this.repository.findByUsername(username);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async findUser(email: string, username: string) {
		try {
			const result = await this.repository.findUser(email, username);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}

	async createUser(email: string, username: string, password: string) {
		try {
			const aggregate = this.factory.createDomain({
				email,
				username,
				password,
			});
			const anemic = aggregate.toAnemic();
			const result = await this.repository.save(anemic);
			return Result.ok<AuthAnemic>(result);
		} catch (error) {
			return Result.fail<AuthAnemic>(error);
		}
	}
}
