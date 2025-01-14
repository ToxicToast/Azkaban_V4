import { Factory } from '@azkaban/shared';
import { GroupAggregate, GroupAnemic } from '@azkaban/auth-domain';
import { GroupData } from '../data/group.data';

export class GroupFactory
	implements Factory<GroupAnemic, GroupAggregate, GroupData>
{
	reconstitute(data: GroupAnemic): GroupAggregate {
		const { id, name, created_at, updated_at, deleted_at } = data;
		return new GroupAggregate(id, name, created_at, updated_at, deleted_at);
	}

	constitute(data: GroupAggregate): GroupAnemic {
		return data.toAnemic();
	}

	createDomain(data: GroupData): GroupAggregate {
		const { id, name, created_at, updated_at, deleted_at } = data;
		return new GroupAggregate(id, name, created_at, updated_at, deleted_at);
	}
}
