import { Module } from '@nestjs/common';
import { WarcraftModule } from './warcraft/warcraft.module';
import { VersionModule } from './version/version.module';

@Module({
	imports: [WarcraftModule, VersionModule],
})
export class ServicesModule {}
