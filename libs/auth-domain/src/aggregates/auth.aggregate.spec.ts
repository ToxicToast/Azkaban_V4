import { UserAggregate } from './user.aggregate';
import { GroupAggregate } from './group.aggregate';
import { AuthAggregate } from './auth.aggregate';

describe('AuthAggregate', () => {
	const userId = '123';
	const username = 'testuser';
	const updatedUsername = username + '-updated';
	const password = 'pass123';
	const email = 'test@test.com';
	const activated_at = null;
	const banned_at = null;
	const loggedin_at = null;
	const created_at = new Date();
	const updated_at = null;
	const deleted_at = null;
	const groupId = '123';
	const groupName = 'test-group';
	const updatedgroupName = groupName + '-updated';

	const user = new UserAggregate(
		userId,
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
	const group = new GroupAggregate(
		groupId,
		groupName,
		created_at,
		updated_at,
		deleted_at,
	);

	it('should create auth aggregate with valid parameters', () => {
		const auth = new AuthAggregate(user, [group]);
		expect(auth).toBeInstanceOf(AuthAggregate);
	});

	it('should convert to anemic with all properties', () => {
		const auth = new AuthAggregate(user, [group]);
		const anemic = auth.toAnemic();
		expect(anemic.user).toEqual(user.toAnemic());
		expect(anemic.groups).toEqual([group.toAnemic()]);
	});

	it('should convert to AuthAnemic with user and groups data', () => {
		const newGroup = new GroupAggregate(
			groupId + '4',
			updatedgroupName,
			created_at,
			updated_at,
			deleted_at,
		);
		const auth = new AuthAggregate(user, [group]);
		auth.addGroup(newGroup);
		const anemic = auth.toAnemic();
		expect(anemic.groups).toHaveLength(2);
		expect(anemic.groups[0]).toEqual(group.toAnemic());
		expect(anemic.groups[1]).toEqual(newGroup.toAnemic());
	});

	it('should not modify groups array when removing non-existent group ID', () => {
		const auth = new AuthAggregate(user, [group]);
		auth.removeGroup('non-existent-id');
		const anemic = auth.toAnemic();
		expect(anemic.groups).toHaveLength(1);
		expect(anemic.groups[0]).toEqual(group.toAnemic());
	});

	it('should not allow adding duplicate group', () => {
		const auth = new AuthAggregate(user, [group]);
		auth.addGroup(group);
		const anemic = auth.toAnemic();
		expect(anemic.groups).toHaveLength(1);
		expect(anemic.groups[0]).toEqual(group.toAnemic());
	});

	it('should allow removing group', () => {
		const newGroup = new GroupAggregate(
			groupId + '4',
			updatedgroupName,
			created_at,
			updated_at,
			deleted_at,
		);
		const auth = new AuthAggregate(user, [group, newGroup]);
		const anemic = auth.toAnemic();
		expect(anemic.groups).toHaveLength(2);
		expect(anemic.groups[0]).toEqual(group.toAnemic());
		expect(anemic.groups[1]).toEqual(newGroup.toAnemic());
		auth.removeGroup(groupId + '4');
		const newAnemic = auth.toAnemic();
		expect(newAnemic.groups).toHaveLength(1);
		expect(newAnemic.groups[0]).toEqual(group.toAnemic());
		expect(newAnemic.groups[1]).toBeUndefined();
	});

	it('should allow ban user', () => {
		const auth = new AuthAggregate(user, []);
		const anemic = auth.toAnemic();
		expect(anemic.user.banned_at).toBeNull();
		expect(anemic.user.isBanned).toBe(false);
		auth.banUser();
		const newAnemic = auth.toAnemic();
		expect(newAnemic.user.banned_at).not.toBeNull();
		expect(newAnemic.user.isBanned).toBe(true);
	});

	it('should allow unban user', () => {
		const auth = new AuthAggregate(user, []);
		auth.banUser();
		const anemic = auth.toAnemic();
		expect(anemic.user.banned_at).not.toBeNull();
		expect(anemic.user.isBanned).toBe(true);
		auth.unbanUser();
		const newAnemic = auth.toAnemic();
		expect(newAnemic.user.banned_at).toBeNull();
		expect(newAnemic.user.isBanned).toBe(false);
	});
});
