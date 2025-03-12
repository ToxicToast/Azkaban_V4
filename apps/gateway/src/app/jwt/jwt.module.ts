import { Module } from '@nestjs/common';
import { JwtModule as BaseModule } from '@nestjs/jwt';
import { JwtGuard } from '../guards';
import { AppConfig } from '../../config';

@Module({
	imports: [
		BaseModule.register({
			global: true,
			secret: AppConfig.jwt,
			signOptions: { expiresIn: '1h' },
		}),
	],
	providers: [JwtGuard],
	exports: [JwtGuard],
})
export class JwtModule {}
