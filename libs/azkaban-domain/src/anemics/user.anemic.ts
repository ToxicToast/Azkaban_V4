import { Anemic, DomainEvent, Nullable } from '@azkaban/shared';

export interface UserAnemic extends Anemic {
	readonly user_id: string;
	readonly username: string;
	readonly email: string;
	readonly password: string;
	readonly salt: string;
	readonly activated_at: Nullable<Date>;
	readonly loggedin_at: Nullable<Date>;
}

export interface UserAggregateAnemic {
	id: string;
	user: UserAnemic;
	events: Array<DomainEvent>;
}
