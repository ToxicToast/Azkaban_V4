import { Factory } from '@azkaban/shared';
import { AuthAnemic } from '../anemics';
import { AuthAggregate } from '../aggregates';
import { AuthData } from '../data';
import { UserFactory } from './user.factory';
import { GroupFactory } from './group.factory';

export class AuthFactory
	implements Factory<AuthAnemic, AuthAggregate, AuthData>
{
	reconstitute(data: AuthAnemic): AuthAggregate {
		const { user, groups } = data;
		const userAggregate = new UserFactory().reconstitute(user);
		const groupAggregates = groups.map((group) =>
			new GroupFactory().reconstitute(group),
		);
		return new AuthAggregate(userAggregate, groupAggregates);
	}

	constitute(data: AuthAggregate): AuthAnemic {
		return data.toAnemic();
	}

	createDomain(data: AuthData): AuthAggregate {
		const { user, groups } = data;
		const userAggregate = new UserFactory().createDomain(user);
		const groupAggregates = groups.map((group) =>
			new GroupFactory().createDomain(group),
		);
		return new AuthAggregate(userAggregate, groupAggregates);
	}
}
