import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Nullable, WarcraftRoutes } from '@azkaban/shared';
import { CharacterService } from './character.service';
import { CharacterDAO } from '@azkaban/warcraft-character-infrastructure';

@Controller({
	path: WarcraftRoutes.CHARACTER,
	version: '1',
})
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Get(WarcraftRoutes.INDEX)
	async getList(): Promise<Array<CharacterDAO>> {
		return await this.service.characterList().catch((error) => {
			Logger.error(error, CharacterController.name);
			throw error;
		});
	}

	@Get(WarcraftRoutes.CHARACTERBYID)
	async getById(@Param('id') id: string): Promise<Nullable<CharacterDAO>> {
		return await this.service.characterById(id).catch((error) => {
			Logger.error(error, CharacterController.name);
			throw error;
		});
	}

	@Post(WarcraftRoutes.INDEX)
	async create(
		@Body('region') region: string,
		@Body('realm') realm: string,
		@Body('name') name: string,
	): Promise<CharacterDAO> {
		return await this.service
			.createCharacter(region, realm, name)
			.catch((error) => {
				Logger.error(error, CharacterController.name);
				throw error;
			});
	}
}
