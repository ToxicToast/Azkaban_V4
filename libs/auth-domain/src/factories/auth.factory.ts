import { Factory } from '@toxictoast/sleepyazkaban-base-domain';
import { RegisterData } from '../data';
import { AuthAnemic } from '../anemics';
import { AuthAggregate } from '../aggregates';

export class AuthFactory
	implements Factory<AuthAnemic, AuthAggregate, RegisterData>
{
	reconstitute(anemic: AuthAnemic): AuthAggregate {
		const { id, username, email, password } = anemic;
		return new AuthAggregate(id, username, email, password);
	}

	constitute(domain: AuthAggregate): AuthAnemic {
		return domain.toAnemic();
	}

	createDomain(data: RegisterData): AuthAggregate {
		const { username, email, password } = data;
		return new AuthAggregate(null, username, password, email);
	}
}
