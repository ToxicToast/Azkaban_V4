import { Controller, Sse } from '@nestjs/common';
import { SSERoutes } from '@azkaban/shared';
import { Observable, Subject } from 'rxjs';

@Controller({
	path: SSERoutes.CONTROLLER,
	version: '1',
})
export class SseController {
	private readonly events$ = new Subject<MessageEvent>();

	private transformToMessageEvent(
		event: string,
		data: unknown,
	): MessageEvent {
		return new MessageEvent(event, {
			data: {
				data,
			},
		});
	}

	@Sse()
	onEvents(): Observable<MessageEvent> {
		return this.events$.asObservable();
	}
}
