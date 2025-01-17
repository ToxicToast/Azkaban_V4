import { UserAnemic } from '../anemics';
import { UserFactory } from '../factories';
import { UserRepository } from '../repositories';
import { Result } from '@azkaban/shared';

export class UserService {
	private readonly factory: UserFactory = new UserFactory();

	constructor(private readonly repository: UserRepository) {}

	async save(anemic: UserAnemic): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async findByUsername(username: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.findByUsername(username);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}

	async findByEmail(email: string): Promise<Result<UserAnemic>> {
		try {
			const result = await this.repository.findByEmail(email);
			return Result.ok<UserAnemic>(result);
		} catch (error) {
			return Result.fail<UserAnemic>(error);
		}
	}
}
