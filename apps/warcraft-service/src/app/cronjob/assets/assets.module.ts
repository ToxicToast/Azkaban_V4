import { Module } from '@nestjs/common';
import { BullModule } from '@azkaban/shared';
import { CronjobService } from '../cronjob.service';
import { ApiModule } from '../../api/api.module';
import { AssetsCron } from './assets.cron';
import { AssetsProcessor } from './assets.processor';
import { CronjobAssetsController } from './assets.controller';

@Module({
	imports: [ApiModule, BullModule.registerQueue('warcraft-assets')],
	controllers: [CronjobAssetsController],
	providers: [CronjobService, AssetsCron, AssetsProcessor],
})
export class AssetsModule {}
