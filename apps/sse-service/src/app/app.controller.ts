import { Body, Controller, Post, Sse } from '@nestjs/common';
import { AzkabanSSETopics, ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller(ControllerHelper('sse'))
export class AppController {
	constructor(private readonly service: AppService) {}

	@Span('sse-service.sse.service')
	@Sse()
	onEvents(): Observable<MessageEvent> {
		return this.service.getObservable();
	}

	@Span(AzkabanSSETopics.WARHAMMER + '.service')
	@EventPattern(AzkabanSSETopics.WARHAMMER)
	async onWarhammerEvents(@Payload() payload: unknown): Promise<void> {
		this.service.onSendNextEvent(AzkabanSSETopics.WARHAMMER, payload);
	}

	@Span(AzkabanSSETopics.WARCRAFT + '.service')
	@EventPattern(AzkabanSSETopics.WARCRAFT)
	async onWarcraftEvents(@Payload() payload: unknown): Promise<void> {
		this.service.onSendNextEvent(AzkabanSSETopics.WARCRAFT, payload);
	}

	@Span(AzkabanSSETopics.AZKABAN + '.service')
	@EventPattern(AzkabanSSETopics.AZKABAN)
	async onAzkabanEvents(@Payload() payload: unknown): Promise<void> {
		this.service.onSendNextEvent(AzkabanSSETopics.AZKABAN, payload);
	}

	@Span(AzkabanSSETopics.CREATE + '.service')
	@Post('/')
	postEvents(@Body() payload: unknown): void {
		this.service.onSendNextEvent(AzkabanSSETopics.CREATE, payload);
	}
}
