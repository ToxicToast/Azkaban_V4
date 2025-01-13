import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VersionModule } from './version/version.module';

@Module({
	imports: [AuthModule, VersionModule],
})
export class ServicesModule {}
