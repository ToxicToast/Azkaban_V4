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

	async findByRegionRealmName(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterAnemic> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { region, realm, name },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
