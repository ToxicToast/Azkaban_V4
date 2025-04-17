import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DementorVersionQuery } from './dementorVersion.query';
import { VersionService } from '@azkaban/shared';
import { Logger } from '@nestjs/common';

@QueryHandler(DementorVersionQuery)
export class DementorVersionHandler
	implements IQueryHandler<DementorVersionQuery>
{
	constructor(private readonly service: VersionService) {}

	async execute() {
		Logger.log(DementorVersionHandler.name, {});
		return this.service.appVersion();
	}
}
