import { Controller, HttpStatus } from '@nestjs/common';
import { WarcraftCharacterTopics, WarcraftRoutes } from '@azkaban/shared';
import { CharacterService } from './character.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CharacterCache } from './character.cache';
import { CharacterResponse } from './character.model';

@Controller(WarcraftRoutes.CHARACTER)
export class CharacterController {
	constructor(
		private readonly service: CharacterService,
		private readonly cache: CharacterCache,
	) {}

	@MessagePattern(WarcraftCharacterTopics.LIST)
	async getCharacterList() {
		const response = await this.service.characterList();
		await this.cache.cacheCharacterList(response);
		return response;
	}

	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload('id') id: string) {
		if (!id) {
			throw new RpcException({
				message: 'Id is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.characterById(id);
		if (response === null) {
			throw new RpcException({
				message: 'Character not found',
				status: HttpStatus.NOT_FOUND,
			});
		}
		await this.cache.cacheCharacterById(id, response);
		return response;
	}

	@MessagePattern(WarcraftCharacterTopics.CREATE)
	async createCharacter(
		@Payload('region') region: string,
		@Payload('realm') realm: string,
		@Payload('name') name: string,
	): Promise<CharacterResponse> {
		if (!region) {
			throw new RpcException({
				message: 'Region is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!realm) {
			throw new RpcException({
				message: 'Realm is required',
				status: HttpStatus.BAD_REQUEST,
			});
		} else if (!name) {
			throw new RpcException({
				message: 'Name is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.characterCreate(
			region,
			realm,
			name,
		);
		if (response === null) {
			throw new RpcException({
				message: 'Character not created',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		await this.cache.removeCacheOnCreate();
		return response;
	}
}
