import { Module } from '@nestjs/common';
import { AuthCallbackController } from './auth.controller';
import { LoginCommandHandler } from './commands';

export const CommandHandlers = [LoginCommandHandler];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
	controllers: [AuthCallbackController],
	providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers],
})
export class CallbackAuthModule {}
