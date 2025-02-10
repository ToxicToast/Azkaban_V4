import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	controllers: [CallbackController],
	providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class CallbackModule {}
