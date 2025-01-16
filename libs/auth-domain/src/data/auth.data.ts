import { UserData } from './user.data';
import { GroupData } from './group.data';

export interface AuthData {
	user: UserData;
	groups: Array<GroupData>;
}
