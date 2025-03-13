import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';

@Module({
	imports: [BullModule.registerQueue('azkaban-users')],
	providers: [],
})
export class UserModule {}
