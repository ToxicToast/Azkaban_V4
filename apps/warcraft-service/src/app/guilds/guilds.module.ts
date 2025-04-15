import { Module } from '@nestjs/common';
import { GuildsCache } from './guilds.cache';
import { GuildsEvents } from './guilds.events';
import { GuildsService } from './guilds.service';
import { GuildsController } from './guilds.controller';

@Module({
	controllers: [GuildsController],
	providers: [GuildsCache, GuildsService, GuildsEvents],
	exports: [GuildsService],
})
export class GuildsModule {}
