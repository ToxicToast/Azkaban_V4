import { Result } from '@azkaban/shared';
import { GroupFactory } from '../factories';
import { GroupAnemic } from '../anemics';
import { GroupRepository } from '../repositories';

export class GroupService {
	private readonly factory: GroupFactory = new GroupFactory();

	constructor(private readonly repository: GroupRepository) {}

	private async save(anemic: GroupAnemic): Promise<Result<GroupAnemic>> {
		try {
			const result = await this.repository.save(anemic);
			return Result.ok<GroupAnemic>(result);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}

	async findByUserId(userId: string): Promise<Result<Array<GroupAnemic>>> {
		try {
			const result = await this.repository.findByUserId(userId);
			return Result.ok<Array<GroupAnemic>>(result);
		} catch (error) {
			return Result.fail<Array<GroupAnemic>>(error);
		}
	}

	async findByGroupId(groupId: string): Promise<Result<GroupAnemic>> {
		try {
			const result = await this.repository.findByGroupId(groupId);
			return Result.ok<GroupAnemic>(result);
		} catch (error) {
			return Result.fail<GroupAnemic>(error);
		}
	}
}
