import { GroupAnemic } from '../anemics';
import { Repository, Chainable } from '@azkaban/shared';

interface GroupAdditions {
	findByUserId(userId: string): Promise<Array<GroupAnemic>>;
	findByGroupId(groupId: string): Promise<GroupAnemic>;
}

type RepositoryWithOnlySave = Pick<
	Repository<GroupAnemic>,
	'save' | 'findById' | 'findList'
>;

export type GroupRepository = Chainable<RepositoryWithOnlySave, GroupAdditions>;
