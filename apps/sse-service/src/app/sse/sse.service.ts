import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
	private readonly events$ = new Subject<MessageEvent>();

	private transformToMessageEvent<DataType>(
		event: string,
		data: DataType,
	): MessageEvent {
		return new MessageEvent(event, {
			data: {
				data,
			},
		});
	}

	onSendNextEvent<DataType>(event: string, data: DataType): void {
		const messageEvent = this.transformToMessageEvent<DataType>(
			event,
			data,
		);
		this.events$.next(messageEvent);
	}

	getObservable(): Observable<MessageEvent<unknown>> {
		return this.events$.asObservable();
	}
}
