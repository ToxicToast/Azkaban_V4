import { Controller, Sse } from '@nestjs/common';
import { SSERoutes } from '@azkaban/shared';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller({
	path: SSERoutes.CONTROLLER,
	version: '1',
})
export class SseController {
	constructor(private readonly service: SseService) {}

	@Sse()
	onEvents(): Observable<MessageEvent> {
		return this.service.getObservable();
	}
}
