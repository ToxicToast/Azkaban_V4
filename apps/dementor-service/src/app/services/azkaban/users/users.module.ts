import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IdQueryHandler, ListQueryHandler } from './queries';

@Module({
	controllers: [UsersController],
	providers: [UsersService, ListQueryHandler, IdQueryHandler],
})
export class UsersModule {}
