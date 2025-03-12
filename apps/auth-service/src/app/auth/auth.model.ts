import { Nullable } from '@azkaban/shared';
import { UserDAO } from '@azkaban/user-infrastructure';

export interface AuthModel {
	user: Nullable<UserDAO>;
	groups: Array<string>; // TODO: Change to GroupDAO
}
