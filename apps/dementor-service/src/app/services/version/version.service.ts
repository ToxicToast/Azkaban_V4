import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Span } from 'nestjs-otel';
import { WarcraftTopics } from '@azkaban/shared';
import {
	AzkabanVersionQuery,
	DementorVersionQuery,
	WarcraftVersionQuery,
} from './queries';

@Injectable()
export class VersionService {
	constructor(private readonly queryBus: QueryBus) {}

	@Span(WarcraftTopics.VERSION)
	async getWarcraftServiceVersion() {
		Logger.log('Fetch Warcraft Service Version');
		return await this.queryBus.execute(new WarcraftVersionQuery());
	}

	@Span(WarcraftTopics.VERSION)
	async getAzkabanServiceVersion() {
		Logger.log('Fetch Azkaban Service Version');
		return await this.queryBus.execute(new AzkabanVersionQuery());
	}

	@Span(WarcraftTopics.VERSION)
	async getDementorServiceVersion() {
		Logger.log('Fetch Dementor Service Version');
		return await this.queryBus.execute(new DementorVersionQuery());
	}
}
