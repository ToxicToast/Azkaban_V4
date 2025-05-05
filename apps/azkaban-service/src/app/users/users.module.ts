import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersCache } from './users.cache';
import { UsersService } from './users.service';
import { UsersEvents } from './users.events';
@Module({
	controllers: [UsersController],
	providers: [UsersCache, UsersService, UsersEvents],
	exports: [UsersService],
})
export class UsersModule {}
