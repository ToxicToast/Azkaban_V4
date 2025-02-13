import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { AuthCallbackController } from './auth.controller';
import { LoginCommandHandler } from './commands';

export const CommandHandlers = [LoginCommandHandler];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	controllers: [CallbackController, AuthCallbackController],
	providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class CallbackModule {}
