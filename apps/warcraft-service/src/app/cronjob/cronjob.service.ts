import { Inject, Injectable } from '@nestjs/common';
import {
	CharacterEntity,
	CharacterRepository,
	CharacterService,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CronjobService {
	private readonly characterRepository: CharacterRepository;
	private readonly characterService: CharacterService;

	constructor(
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterEntity: Repository<CharacterEntity>,
		private readonly eventEmitter: EventEmitter2,
	) {
		this.characterRepository = new CharacterRepository(
			this.characterEntity,
		);
		this.characterService = new CharacterService(
			this.characterRepository,
			this.eventEmitter,
		);
	}

	async getAllCharacters() {
		return await this.characterService.getCharacterList();
	}

	async updateCharacter(id: number, data: UpdateCharacterDTO) {
		return await this.characterService.updateCharacter(id, data);
	}

	async deleteCharacter(id: number) {
		return await this.characterService.deleteCharacter(id);
	}

	async restoreCharacter(id: number) {
		return await this.characterService.restoreCharacter(id);
	}

	async activateCharacter(id: number) {
		return await this.characterService.activateCharacter(id);
	}
}
