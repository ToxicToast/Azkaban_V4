import { Module } from '@nestjs/common';
import { GuildsCache } from './guilds.cache';
import { GuildsEvents } from './guilds.events';

@Module({
	controllers: [],
	providers: [GuildsCache, GuildsEvents],
	exports: [],
})
export class GuildsModule {}
