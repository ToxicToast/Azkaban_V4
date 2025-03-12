import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCache } from './user.cache';

@Module({
	controllers: [UserController],
	providers: [UserService, UserCache],
})
export class UserModule {}
