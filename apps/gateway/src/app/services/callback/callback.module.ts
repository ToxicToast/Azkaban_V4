import { Module } from '@nestjs/common';
import { CallbackAuthModule } from './auth/auth.module';

@Module({
	imports: [CallbackAuthModule],
})
export class CallbackModule {}
