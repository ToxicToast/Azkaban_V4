import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
import { VersionController } from './version/version.controller';

@Module({
	controllers: [SseController, VersionController],
	providers: [SseService],
})
export class SseModule {}
