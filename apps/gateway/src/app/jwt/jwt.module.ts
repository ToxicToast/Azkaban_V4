import { Module } from '@nestjs/common';
import { JwtModule as BaseModule } from '@nestjs/jwt';
import { JwtGuard } from '../guards';

@Module({
	imports: [
		BaseModule.register({
			global: true,
		}),
	],
	providers: [JwtGuard],
	exports: [JwtGuard],
})
export class JwtModule {}
