import { Module } from '@nestjs/common';
import { CharacterModule } from './character/character.module';
import { ApiModule } from './api/api.module';
import { RaiderModule } from './raider/raider.module';
import { AuditModule } from './audit/audit.module';

@Module({
	imports: [CharacterModule, ApiModule, RaiderModule, AuditModule],
})
export class WarcraftModule {}
