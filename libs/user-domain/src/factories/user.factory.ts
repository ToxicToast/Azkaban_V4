import { Factory } from '@azkaban/shared';
import { UserAnemic } from '../anemics';
import { UserData } from '../data';
import { UserDomain } from '../domains';
import {
	ActivatedAtValueObject,
	BannedAtValueObject,
	EmailValueObject,
	LoggedInAtValueObject,
	PasswordValueObject,
	UsernameValueObject,
} from '../valueObjects';
import { UserAggregate } from '../aggregates';

export class UserFactory
	implements Factory<UserAnemic, UserDomain, UserData, UserAggregate>
{
	reconstitute(anemic: UserAnemic): UserAggregate {
		const {
			id,
			username,
			email,
			password,
			salt,
			banned_at,
			activated_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
		} = anemic;

		const usernameVO = new UsernameValueObject(username);
		const emailVO = new EmailValueObject(email);
		const passwordVO = new PasswordValueObject(password);
		const bannedAtVO = new BannedAtValueObject(banned_at);
		const activatedAtVO = new ActivatedAtValueObject(activated_at);
		const loggedInVO = new LoggedInAtValueObject(loggedin_at);

		const userDomain = new UserDomain(
			id,
			usernameVO.value,
			emailVO.value,
			passwordVO.value,
			salt,
			bannedAtVO.value,
			activatedAtVO.value,
			loggedInVO.value,
			created_at,
			updated_at,
			deleted_at,
		);

		return new UserAggregate(userDomain);
	}

	constitute(domain: UserDomain): UserAnemic {
		return domain.toAnemic();
	}

	createDomain(data: UserData): UserAggregate {
		const { id, username, password, email, salt } = data;
		const usernameVO = new UsernameValueObject(username);
		const emailVO = new EmailValueObject(email);
		const passwordVO = new PasswordValueObject(password);
		const domain = new UserDomain(
			id,
			usernameVO.value,
			emailVO.value,
			passwordVO.value,
			salt,
			null,
			null,
			null,
			new Date(),
			null,
			null,
		);
		return new UserAggregate(domain);
	}
}
