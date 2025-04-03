import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { ControllerHelper, Optional, WarcraftRoutes } from '@azkaban/shared';
import { CharacterService } from './character.service';
import { Span } from 'nestjs-otel';

@Controller(ControllerHelper(WarcraftRoutes.CHARACTER))
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Span(WarcraftRoutes.INDEX)
	@Get(WarcraftRoutes.INDEX)
	async getCharacters(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		Logger.log('Get Characters', { limit, offset });
		return await this.service.characterList(limit, offset);
	}
}
