import { Factory } from '@azkaban/shared';
import { UserAnemic } from '../anemics';
import { UserAggregate } from '../aggregates';
import { UserData } from '../data';
import { UserId, UserName } from '../valueObjects';

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

		const userId = new UserId(id);
		const userName = new UserName(username);

		return new UserAggregate(
			userId.value,
			userName.value,
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

		const userId = new UserId();
		const userName = new UserName(username);

		return new UserAggregate(
			userId.value,
			userName.value,
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
