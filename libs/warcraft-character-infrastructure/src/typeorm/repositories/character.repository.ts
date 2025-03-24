import {
	CharacterAnemic,
	CharacterRepository as DomainRepository,
} from '@azkaban/warcraft-character-domain';
import { CharacterMapper } from '../mappers';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../entities';
import { CharacterDAO } from '../../dao/character.dao';

export class CharacterRepository implements DomainRepository {
	private readonly mapper: CharacterMapper = new CharacterMapper();

	constructor(private readonly repository: Repository<CharacterEntity>) {}

	async findList(): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			order: {
				created_at: 'ASC',
			},
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findById(id: string): Promise<CharacterAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async save(data: CharacterDAO): Promise<CharacterDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}

	async findByRealm(realm: string): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { realm },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByRace(race_id: number): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { race_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByClass(class_id: number): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { class_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByFaction(faction_id: number): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { faction_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findByGuild(guild_id: number): Promise<Array<CharacterAnemic>> {
		const entities = await this.repository.find({
			withDeleted: true,
			where: { guild_id },
		});
		return entities.map((entity) => this.mapper.toDomain(entity));
	}
}
