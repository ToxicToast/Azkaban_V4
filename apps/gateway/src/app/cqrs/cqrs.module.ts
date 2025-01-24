import { Module } from '@nestjs/common';
import { CqrsModule as BaseModule } from '@nestjs/cqrs';

@Module({
	imports: [BaseModule.forRoot()],
	exports: [BaseModule],
})
export class CqrsModule {}
