import { GroupAggregate } from './group.aggregate';

describe('GroupAggregate', () => {
	const id = '123';
	const name = 'test-group';
	const updatedName = name + '-updated';
	const created_at = new Date();
	const updated_at = null;
	const deleted_at = null;

	it('should create group aggregate with valid parameters', () => {
		const group = new GroupAggregate(
			id,
			name,
			created_at,
			updated_at,
			deleted_at,
		);

		expect(group).toBeInstanceOf(GroupAggregate);
	});

	it('should convert to anemic with all properties', () => {
		const group = new GroupAggregate(
			id,
			name,
			created_at,
			updated_at,
			deleted_at,
		);
		const anemic = group.toAnemic();

		expect(anemic.id).toBe(id);
		expect(anemic.name).toBe(name);
		expect(anemic.created_at).toBe(created_at);
		expect(anemic.updated_at).toBeNull();
		expect(anemic.deleted_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
		expect(anemic.isDeleted).toBe(false);
	});

	it('should not update timestamp when same name provided', () => {
		const group = new GroupAggregate(
			id,
			name,
			created_at,
			updated_at,
			null,
		);
		group.updateName(name);
		const anemic = group.toAnemic();
		expect(anemic.updated_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
	});

	it('should update timestamp when different name provided', () => {
		const group = new GroupAggregate(
			id,
			name,
			created_at,
			updated_at,
			deleted_at,
		);
		group.updateName(updatedName);
		const anemic = group.toAnemic();
		expect(anemic.name).toBe(updatedName);
		expect(anemic.updated_at).not.toBeNull();
		expect(anemic.isUpdated).toBe(true);
	});

	it('should handle null values for dates in constructor', () => {
		const group = new GroupAggregate(
			id,
			name,
			created_at,
			updated_at,
			deleted_at,
		);
		const anemic = group.toAnemic();
		expect(anemic.updated_at).toBeNull();
		expect(anemic.deleted_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
		expect(anemic.isDeleted).toBe(false);
	});
});
