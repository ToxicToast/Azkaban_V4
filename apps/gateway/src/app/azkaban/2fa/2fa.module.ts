import { Module } from '@nestjs/common';
import { TwoFactorService } from './2fa.service';
import { TwoFactorController } from './2fa.controller';

@Module({
	controllers: [TwoFactorController],
	providers: [TwoFactorService],
})
export class TwoFactorModule {}
