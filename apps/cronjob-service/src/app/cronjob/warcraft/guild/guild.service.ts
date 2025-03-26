import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	Nullable,
	WarcraftApiTopics,
	WarcraftCharacterTopics,
	WarcraftGuildTopics,
} from '@azkaban/shared';
import { ApiGuildModel } from '../models';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-character-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
	private readonly infrastructureRepository: CharacterRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterRepository: Repository<CharacterEntity>,
	) {
		this.infrastructureRepository = new CharacterRepository(
			this.characterRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getAllGuilds(): Promise<Array<unknown>> {
		try {
			return await this.client
				.send(WarcraftGuildTopics.LIST, {})
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getAllGuilds');
			return [];
		}
	}

	async getGuildFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiGuildModel>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.GUILD, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getGuildFromApi');
			return null;
		}
	}

	async checkCharacterExists(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<CharacterDAO>> {
		try {
			return await this.infrastructureService.getCharacterByRegionRealmName(
				region,
				realm,
				name,
			);
		} catch (error) {
			Logger.error(error, 'checkCharacterExists');
			return null;
		}
	}

	async updateCharacter(
		id: string,
		rank_id: Nullable<number>,
	): Promise<void> {
		try {
			await this.infrastructureService.updateCharacter(id, {
				rank_id,
			});
		} catch (error) {
			Logger.error(error, 'updateCharacter');
		}
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
		rank_id: Nullable<number>,
	): Promise<void> {
		try {
			await this.infrastructureService.createCharacter({
				region,
				realm,
				name,
				rank_id,
			});
		} catch (error) {
			Logger.error(error, 'createCharacter');
		}
	}
}
