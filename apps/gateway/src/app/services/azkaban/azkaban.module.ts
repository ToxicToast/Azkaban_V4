import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		GroupModule,
		CronjobModule,
		EmailModule,
		NotificationModule,
	],
})
export class AzkabanModule {}
