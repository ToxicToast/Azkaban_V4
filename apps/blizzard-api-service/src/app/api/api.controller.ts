import { Controller } from '@nestjs/common';
import { ApiService } from './api.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { WarcraftApiTopics } from '@azkaban/shared';
import { Origins } from 'blizzard.js/dist/endpoints';

@Controller()
export class ApiController {
	constructor(private readonly service: ApiService) {}

	@MessagePattern(WarcraftApiTopics.CHARACTER)
	async getCharacter(
		@Payload('region') region: Origins,
		@Payload('realm') realm: string,
		@Payload('name') name: string,
	) {
		try {
			await this.service.setApiClient(region);
			return await this.service.getCharacter(realm, name);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftApiTopics.INSET)
	async getInset(
		@Payload('region') region: Origins,
		@Payload('realm') realm: string,
		@Payload('name') name: string,
	) {
		try {
			await this.service.setApiClient(region);
			return await this.service.getCharacterInsetPath(realm, name);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
