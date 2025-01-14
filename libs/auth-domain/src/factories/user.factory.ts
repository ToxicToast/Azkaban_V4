import { Factory } from '@azkaban/shared';
import { UserAggregate, UserAnemic, UserData } from '@azkaban/auth-domain';

export class UserFactory
	implements Factory<UserAnemic, UserAggregate, UserData>
{
	reconstitute(data: UserAnemic): UserAggregate {
		const {
			id,
			username,
			email,
			password,
			banned_at,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		return new UserAggregate(
			id,
			username,
			password,
			email,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		);
	}

	constitute(data: UserAggregate): UserAnemic {
		return data.toAnemic();
	}

	createDomain(data: UserData): UserAggregate {
		const { username, password, email } = data;
		return new UserAggregate(
			'',
			username,
			password,
			email,
			null,
			null,
			null,
			new Date(),
			null,
			null,
		);
	}
}
