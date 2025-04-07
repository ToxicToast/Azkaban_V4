import { Inject, Injectable } from '@nestjs/common';
import {
	CharacterEntity,
	CharacterRepository,
	CharacterService,
	UpdateCharacterDTO,
} from '@azkaban/warcraft-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class CronjobService {
	private readonly characterRepository: CharacterRepository;
	private readonly characterService: CharacterService;

	constructor(
		@Inject('CHARACTER_REPOSITORY')
		private readonly characterEntity: Repository<CharacterEntity>,
	) {
		this.characterRepository = new CharacterRepository(
			this.characterEntity,
		);
		this.characterService = new CharacterService(this.characterRepository);
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

	async activateCharacter(id: number) {
		return await this.characterService.activateCharacter(id);
	}
}
