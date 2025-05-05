import { Mapper } from '@azkaban/shared';
import { UserDAO } from '../../dao';
import { UserEntity } from '../entities';
import { UserFactory } from '@azkaban/azkaban-domain';

export class UserMapper implements Mapper<UserDAO, UserEntity> {
	private readonly domainFactory: UserFactory = new UserFactory();

	toEntity(data: UserDAO): UserEntity {
		const {
			id,
			user_id,
			username,
			email,
			password,
			salt,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new UserEntity();
		entity.id = id;
		entity.user_id = user_id;
		entity.username = username;
		entity.email = email;
		entity.password = password;
		entity.salt = salt;
		entity.loggedin_at = loggedin_at;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: UserEntity): UserDAO {
		const {
			id,
			user_id,
			username,
			email,
			password,
			salt,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			user_id,
			username,
			email,
			password,
			salt,
			loggedin_at,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		});
		return aggregate.toAnemic().user;
	}
}
