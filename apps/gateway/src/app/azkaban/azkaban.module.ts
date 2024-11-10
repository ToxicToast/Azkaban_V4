import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';

@Module({
	imports: [AuthModule, UserModule, GroupModule],
})
export class AzkabanModule {}
