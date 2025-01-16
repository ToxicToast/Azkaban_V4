import { Module } from '@nestjs/common';

export const CommandHandlers = [];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	controllers: [],
	providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class ShoppinglistModule {}
