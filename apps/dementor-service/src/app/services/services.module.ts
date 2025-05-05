import { Module } from '@nestjs/common';
import { WarcraftModule } from './warcraft/warcraft.module';
import { VersionModule } from './version/version.module';
import { AzkabanModule } from './azkaban/azkaban.module';

@Module({
	imports: [AzkabanModule, WarcraftModule, VersionModule],
})
export class ServicesModule {}
