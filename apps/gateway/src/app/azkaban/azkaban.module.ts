import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TwoFactorModule } from './2fa/2fa.module';

@Module({
	imports: [AuthModule, TwoFactorModule, UserModule, GroupModule],
})
export class AzkabanModule {}
