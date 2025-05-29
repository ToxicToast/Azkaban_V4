import { Chainable, DomainEvent, Nullable } from '@azkaban/shared';
import { UserResponse } from './users.response';
import { WarcraftResponse } from './warcraft.response';

export type AlertsResponse<EventType = object> = Chainable<
	DomainEvent,
	EventType
>;

export type CreateUserAlert = AlertsResponse<{ user: UserResponse }>;

export type CreateWarcraftCharacterAlert = AlertsResponse<{
	character: WarcraftResponse;
}>;

export type UpdateWarcraftCharacterGuildAlert = AlertsResponse<{
	character_id: string;
	guild: Nullable<string>;
	old_guild: Nullable<string>;
}>;

export type AlertsResponses =
	| CreateUserAlert
	| CreateWarcraftCharacterAlert
	| UpdateWarcraftCharacterGuildAlert;
