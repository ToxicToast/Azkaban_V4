import { GroupAnemic } from '../anemics';
import { Repository, Chainable } from '@azkaban/shared';

interface GroupAdditions {
	findByUserId(userId: string): Promise<Array<GroupAnemic>>;
	findByGroupId(groupId: string): Promise<GroupAnemic>;
}

export type GroupRepository = Chainable<
	Repository<GroupAnemic>,
	GroupAdditions
>;
