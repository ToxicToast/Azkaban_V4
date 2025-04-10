import { Nullable } from '@azkaban/shared';

export class GuildQuery {
	constructor(public readonly guild: Nullable<string>) {}
}
