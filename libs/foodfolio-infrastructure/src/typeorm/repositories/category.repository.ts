import { CategoryRepository as DomainRepository } from '@azkaban/foodfolio-domain';
import { Repository } from 'typeorm';
import { CategoryMapper } from '../mappers';
import { CategoryEntity } from '../entities';
import { CategoryDAO } from '../../dao';
import { Nullable, Optional } from '@azkaban/shared';

export class CategoryRepository implements DomainRepository {
	private readonly mapper: CategoryMapper = new CategoryMapper();

	constructor(private readonly repository: Repository<CategoryEntity>) {}

	async findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CategoryDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			take: limit,
			skip: offset,
		});
		return entities.map(
			(entity: CategoryEntity): CategoryDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<CategoryDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async save(data: CategoryDAO): Promise<CategoryDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}

	async findByCategoryId(
		category_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<CategoryDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { category_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByParentId(
		parent_id: Nullable<string>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<CategoryDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			where: { parent_id },
		});
		return entities.map(
			(entity: CategoryEntity): CategoryDAO =>
				this.mapper.toDomain(entity),
		);
	}

	async findByTitle(
		title: string,
		withDeleted?: Optional<boolean>,
	): Promise<CategoryDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { title },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
