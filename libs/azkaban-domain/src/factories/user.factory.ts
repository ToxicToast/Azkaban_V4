import { Factory, UuidHelper } from '@azkaban/shared';
import { UserAnemic } from '../anemics';
import { UserDomain } from '../domains';
import { UserData } from '../data';
import { UserAggregate } from '../aggregates';

export class UserFactory
	implements Factory<UserAnemic, UserDomain, UserData, UserAggregate>
{
	reconstitute(anemic: UserAnemic): UserAggregate {
		const {
			id,
			user_id,
			username,
			email,
			password,
			salt,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;
		const userDomain = new UserDomain(
			id,
			user_id,
			username,
			email,
			password,
			salt,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		);
		const uuid = UuidHelper.create().value;
		return new UserAggregate(uuid, userDomain);
	}

	constitute(domain: UserDomain): UserAnemic {
		return domain.toAnemic();
	}

	createDomain(data: UserData): UserAggregate {
		const { user_id, username, email, password, salt } = data;
		const domain = new UserDomain(
			0,
			user_id,
			username,
			email,
			password,
			salt,
			null,
			null,
			new Date(),
			null,
			null,
		);
		domain.createUser();
		const uuid = UuidHelper.create().value;
		return new UserAggregate(uuid, domain);
	}
}
