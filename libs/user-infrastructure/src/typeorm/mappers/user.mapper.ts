import { Mapper } from '@azkaban/shared';
import { UserDAO } from '../../dao';
import { UserEntity } from '../entities';
import { UserFactory } from '@azkaban/user-domain';

export class UserMapper implements Mapper<UserDAO, UserEntity> {
	private readonly domainFactory: UserFactory = new UserFactory();

	toEntity(data: UserDAO): UserEntity {
		const {
			id,
			username,
			email,
			password,
			salt,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new UserEntity();
		entity.id = id;
		entity.username = username;
		entity.email = email;
		entity.password = password;
		entity.salt = salt;
		entity.activated_at = activated_at;
		entity.banned_at = banned_at;
		entity.loggedin_at = loggedin_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: UserEntity): UserDAO {
		const {
			id,
			username,
			email,
			password,
			salt,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			username,
			email,
			password,
			salt,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic();
	}
}
