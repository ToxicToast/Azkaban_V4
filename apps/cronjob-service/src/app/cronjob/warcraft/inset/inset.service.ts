import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Nullable, WarcraftApiTopics } from '@azkaban/shared';
import { ApiInsetModel, CharacterModel } from '../models';
import {
	CharacterDAO,
	CharacterEntity,
	CharacterRepository,
	CharacterService as BaseService,
} from '@azkaban/warcraft-character-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class InsetService {
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

	async getAllCharacters(): Promise<Array<CharacterDAO>> {
		return await this.infrastructureService.getCharacterList();
	}

	async getInsetFromApi(
		region: string,
		realm: string,
		name: string,
	): Promise<Nullable<ApiInsetModel>> {
		try {
			return await this.client
				.send(WarcraftApiTopics.INSET, { region, realm, name })
				.toPromise();
		} catch (error) {
			Logger.error(error, 'getInsetFromApi');
			return null;
		}
	}

	async updateCharacter(
		id: string,
		insetArray: ApiInsetModel,
	): Promise<Nullable<CharacterDAO>> {
		try {
			const inset = insetArray.assets.find(
				(asset) => asset.key === 'inset',
			);
			const insetValue = inset?.value ?? null;
			return await this.infrastructureService.updateCharacter(id, {
				inset: insetValue,
			});
		} catch (error) {
			Logger.error(error, 'updateCharacter');
			return null;
		}
	}

	async deleteCharacter(id: string): Promise<void> {
		try {
			await this.infrastructureService.deleteCharacter(id);
		} catch (error) {
			Logger.error(error, 'deleteCharacter');
		}
	}

	async restoreCharacter(id: string): Promise<void> {
		try {
			await this.infrastructureService.restoreCharacter(id);
		} catch (error) {
			Logger.error(error, 'restoreCharacter');
		}
	}
}
