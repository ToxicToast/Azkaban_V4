import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Nullable, WarcraftRoutes } from '@azkaban/shared';
import { CharacterService } from './character.service';

@Controller({
	path: WarcraftRoutes.CHARACTER,
	version: '1',
})
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Get(WarcraftRoutes.CHARACTERLIST)
	async getList(): Promise<Array<unknown>> {
		return await this.service.characterList().catch((error) => {
			throw error;
		});
	}

	@Get(WarcraftRoutes.CHARACTERBYID)
	async getById(@Param('id') id: string): Promise<Nullable<unknown>> {
		return await this.service.characterById(id).catch((error) => {
			throw error;
		});
	}

	@Post(WarcraftRoutes.INDEX)
	async create(
		@Body('region') region: string,
		@Body('realm') realm: string,
		@Body('name') name: string,
	): Promise<unknown> {
		return await this.service
			.createCharacter(region, realm, name)
			.catch((error) => {
				throw error;
			});
	}
}
