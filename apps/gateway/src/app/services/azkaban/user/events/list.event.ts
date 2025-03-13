import { UserDAO } from '@azkaban/user-infrastructure';

export class ListEvent {
	constructor(public readonly data: Array<UserDAO>) {}
}
