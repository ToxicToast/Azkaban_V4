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
	): Promise<Array<UserDAO>> {
		const entities = await this.repository.find({
			withDeleted: true,
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

	async findById(id: number): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
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

	async findByUserId(user_id: string): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { user_id },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByEmail(email: string): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { email },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}

	async findByUsername(username: string): Promise<UserDAO> {
		const entity = await this.repository.findOne({
			withDeleted: true,
			where: { username },
		});
		if (entity) {
			return this.mapper.toDomain(entity);
		}
		return null;
	}
}
