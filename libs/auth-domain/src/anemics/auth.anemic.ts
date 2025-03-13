import { Anemic } from '@azkaban/shared';
import { UserAnemic } from '@azkaban/user-domain';

export interface AuthAnemic extends Partial<Anemic> {
	readonly user: UserAnemic;
	readonly groups: Array<string>;
}
