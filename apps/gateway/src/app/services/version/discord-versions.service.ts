import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class DiscordVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	async getVersions() {
		return {};
	}
}
