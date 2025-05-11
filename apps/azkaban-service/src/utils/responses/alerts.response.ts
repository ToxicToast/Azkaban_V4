import { Chainable, DomainEvent } from '@azkaban/shared';
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

export type AlertsResponses = CreateUserAlert | CreateWarcraftCharacterAlert;
