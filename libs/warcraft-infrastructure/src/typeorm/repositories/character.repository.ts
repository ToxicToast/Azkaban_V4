import { CharacterRepository as DomainRepository } from '@azkaban/warcraft-domain';
import { CharacterMapper } from '../mappers';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../entities';
import { Nullable, Optional } from '@azkaban/shared';
import { CharacterDAO } from '../../dao';

export class CharacterRepository implements DomainRepository {
	private readonly mapper: CharacterMapper = new CharacterMapper();

	constructor(private readonly repository: Repository<CharacterEntity>) {}

	async findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: boolean,
	): Promise<Array<CharacterDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			take: limit,
			skip: offset,
		});
		return entities.map(
			(entity: CharacterEntity): CharacterDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findById(id: number, withDeleted?: boolean): Promise<CharacterDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
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
		withDeleted?: boolean,
	): Promise<CharacterDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { region, realm, name },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByFaction(
		faction: Nullable<string>,
		withDeleted?: boolean,
	): Promise<Array<CharacterDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			where: { faction },
		});
		return entities.map(
			(entity: CharacterEntity): CharacterDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findByRace(
		race: Nullable<string>,
		withDeleted?: boolean,
	): Promise<Array<CharacterDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			where: { race },
		});
		return entities.map(
			(entity: CharacterEntity): CharacterDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findByClass(
		character_class: Nullable<string>,
		withDeleted?: boolean,
	): Promise<Array<CharacterDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			where: { class: character_class },
		});
		return entities.map(
			(entity: CharacterEntity): CharacterDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findByGuild(
		guild: Nullable<string>,
		withDeleted?: boolean,
	): Promise<Array<CharacterDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			where: { guild },
		});
		return entities.map(
			(entity: CharacterEntity): CharacterDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findByCharacterId(
		character_id: string,
		withDeleted?: boolean,
	): Promise<CharacterDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { character_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
