import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';
import {
	BlogCommentTopics,
	BlogNewsTopics,
	VersionCache,
} from '@azkaban/shared';

@Injectable()
export class BlogVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async blogNews(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(BlogNewsTopics.VERSION, VersionCache.BLOGNEWS),
		);
	}

	private async blogComments(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(
				BlogCommentTopics.VERSION,
				VersionCache.BLOGCOMMENT,
			),
		);
	}

	async getVersions() {
		const news = await this.blogNews();
		const comments = await this.blogComments();
		//
		return {
			news,
			comments,
		};
	}
}
