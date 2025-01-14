import { GroupAnemic } from './group.anemic';
import { UserAnemic } from './user.anemic';

export interface AuthAnemic {
	readonly user: UserAnemic;
	readonly groups: Array<GroupAnemic>;
}
