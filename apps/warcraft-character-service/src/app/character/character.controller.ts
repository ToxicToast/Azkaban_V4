import { Controller, HttpStatus, Logger } from '@nestjs/common';
import {
	Optional,
	WarcraftCharacterTopics,
	WarcraftRoutes,
} from '@azkaban/shared';
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
		Logger.debug({}, CharacterController.name);
		const response = await this.service.characterList();
		await this.cache.cacheCharacterList(response);
		return response;
	}

	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload('id') id: string) {
		Logger.debug({ id }, CharacterController.name);
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
		Logger.debug(
			{ region, realm, name },
			CharacterController.name,
			'createCharacter',
		);
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

	@MessagePattern(WarcraftCharacterTopics.UPDATE)
	async updateCharacter(
		@Payload('id') id: string,
		@Payload('region') region?: Optional<string>,
		@Payload('realm') realm?: Optional<string>,
		@Payload('name') name?: Optional<string>,
		@Payload('gender_id') gender_id?: Optional<number>,
		@Payload('faction_id') faction_id?: Optional<number>,
		@Payload('race_id') race_id?: Optional<number>,
		@Payload('class_id') class_id?: Optional<number>,
		@Payload('spec_id') spec_id?: Optional<number>,
		@Payload('level') level?: Optional<number>,
		@Payload('item_level') item_level?: Optional<number>,
		@Payload('guild_id') guild_id?: Optional<number>,
		@Payload('rank_id') rank_id?: Optional<number>,
		@Payload('mythic') mythic?: Optional<number>,
	): Promise<CharacterResponse> {
		Logger.debug(
			{
				id,
				region,
				realm,
				name,
				gender_id,
				faction_id,
				race_id,
				class_id,
				spec_id,
				level,
				item_level,
				guild_id,
				rank_id,
				mythic,
			},
			CharacterController.name,
			'updateCharacter',
		);
		if (!id) {
			throw new RpcException({
				message: 'Id is required',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		const response = await this.service.characterUpdate(
			id,
			region,
			realm,
			name,
			gender_id,
			faction_id,
			race_id,
			class_id,
			spec_id,
			level,
			item_level,
			guild_id,
			rank_id,
			mythic,
		);
		if (response === null) {
			throw new RpcException({
				message: 'Character not updated',
				status: HttpStatus.BAD_REQUEST,
			});
		}
		await this.cache.removeCacheOnCreate();
		return response;
	}
}
