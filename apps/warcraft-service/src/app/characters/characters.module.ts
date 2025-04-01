import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';

@Module({
	imports: [],
	controllers: [CharactersController],
	providers: [],
})
export class CharactersModule {}
