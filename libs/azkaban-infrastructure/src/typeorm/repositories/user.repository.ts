import { UserRepository as DomainRepository } from '@azkaban/azkaban-domain';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
import { Optional } from '@azkaban/shared';
import { UserDAO } from '../../dao';
import { UserMapper } from '../mappers';

export class UserRepository implements DomainRepository {
	private readonly mapper: UserMapper = new UserMapper();

	constructor(private readonly repository: Repository<UserEntity>) {}

	async findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<UserDAO>> {
		const entities = await this.repository.find({
			withDeleted: withDeleted ?? false,
			order: {
				id: 'DESC',
			},
			take: limit,
			skip: offset,
		});
		return entities.map(
			(entity: UserEntity): UserDAO => this.mapper.toDomain(entity),
		);
	}

	async findById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async save(data: UserDAO): Promise<UserDAO> {
		const entity = this.mapper.toEntity(data);
		const saved = await this.repository.save(entity);
		if (saved) {
			return this.mapper.toDomain(saved);
		}
		return null;
	}

	async findByUserId(
		user_id: string,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { user_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByEmail(
		email: string,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { email },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByUsername(
		username: string,
		withDeleted?: Optional<boolean>,
	): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: withDeleted ?? false,
			where: { username },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
