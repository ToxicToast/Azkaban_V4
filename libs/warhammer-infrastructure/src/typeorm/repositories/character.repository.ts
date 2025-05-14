import { CharacterRepository as DomainRepository } from '@azkaban/warhammer-domain';
import { CharacterMapper } from '../mappers';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../entities';
import { Optional } from '@azkaban/shared';
import { CharacterDAO } from '../../dao';

export class CharacterRepository implements DomainRepository {
	private readonly mapper: CharacterMapper = new CharacterMapper();

	constructor(private readonly repository: Repository<CharacterEntity>) {}

	async findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
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

	async findById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<CharacterDAO> {
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

	async findByCharacterId(
		character_id: string,
		withDeleted?: Optional<boolean>,
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
