import { Injectable } from '@nestjs/common';
import { CoworkingTasksTopics } from '@azkaban/shared';
import { QueryBus } from '@nestjs/cqrs';
import { VersionQuery } from './queries';

@Injectable()
export class CoworkingVersionsService {
	constructor(private readonly queryBus: QueryBus) {}

	private async tasksVersion(): Promise<string> {
		return await this.queryBus.execute(
			new VersionQuery(CoworkingTasksTopics.VERSION),
		);
	}

	async getVersions() {
		const tasks = await this.tasksVersion();
		//
		return {
			tasks,
		};
	}
}
