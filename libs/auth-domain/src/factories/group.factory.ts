import { Factory } from '@azkaban/shared';
import { GroupData } from '../data/group.data';
import { GroupAnemic } from '../anemics';
import { GroupAggregate } from '../aggregates';

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
