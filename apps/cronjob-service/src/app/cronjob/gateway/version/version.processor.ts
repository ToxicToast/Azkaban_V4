import { Processor, WorkerHost } from '@nestjs/bullmq';
import { VersionService } from './version.service';

@Processor('azkaban-version')
export class VersionProcessor extends WorkerHost {
	constructor(private readonly service: VersionService) {
		super();
	}

	async process(): Promise<unknown> {
		return await this.service.refreshVersion();
	}
}
