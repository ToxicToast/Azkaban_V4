import { Module } from '@nestjs/common';
import { WarcraftModule } from './warcraft/warcraft.module';

@Module({
	imports: [WarcraftModule],
})
export class ServicesModule {}
