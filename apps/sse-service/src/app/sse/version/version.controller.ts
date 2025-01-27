import { Controller } from '@nestjs/common';
import { CronjobEvents, SSERoutes } from '@azkaban/shared';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SseService } from '../sse.service';

@Controller({
	path: SSERoutes.VERSION,
	version: '1',
})
export class VersionController {
	constructor(private readonly service: SseService) {}

	@EventPattern(CronjobEvents.VERSION)
	onRefreshVersionCache(@Payload() data: { version: unknown }): void {
		this.service.onSendNextEvent(CronjobEvents.VERSION, data);
	}
}
