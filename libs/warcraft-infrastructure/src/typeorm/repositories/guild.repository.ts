import { GuildRepository as DomainRepository } from '@azkaban/warcraft-domain';
import { Repository } from 'typeorm';
import { GuildMapper } from '../mappers';
import { GuildEntity } from '../entities';
import { Nullable, Optional } from '@azkaban/shared';
import { GuildDAO } from '../../dao';

export class GuildRepository implements DomainRepository {
	private readonly mapper: GuildMapper = new GuildMapper();

	constructor(private readonly repository: Repository<GuildEntity>) {}

	async findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<GuildDAO>> {
		const entities = await this.repository.find({
			withDeleted: true,
			order: {
				id: 'DESC',
			},
			take: limit,
			skip: offset,
		});
		return entities.map(
			(entity: GuildEntity): GuildDAO => this.mapper.toDomain(entity),
		);
	}

	async findById(id: number): Promise<GuildDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async save(data: GuildDAO): Promise<GuildDAO> {
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
	): Promise<GuildDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { region, realm, name },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByFaction(faction: Nullable<string>): Promise<Array<GuildDAO>> {
		const entities = await this.repository.find({
			withDeleted: true,
			order: {
				id: 'DESC',
			},
			where: { faction },
		});
		return entities.map(
			(entity: GuildEntity): GuildDAO => this.mapper.toDomain(entity),
		);
	}

	async findByGuildId(guild_id: Nullable<string>): Promise<GuildDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			order: {
				id: 'DESC',
			},
			where: { guild_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
