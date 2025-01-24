import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
	const id = '123';
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

	it('should create user aggregate with valid parameters', () => {
		const user = new UserAggregate(
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

		expect(user).toBeInstanceOf(UserAggregate);
	});

	it('should convert to anemic with all properties', () => {
		const user = new UserAggregate(
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
		const anemic = user.toAnemic();

		expect(anemic.id).toBe(id);
		expect(anemic.username).toBe(username);
		expect(anemic.password).toBe(password);
		expect(anemic.email).toBe(email);
		expect(anemic.activated_at).toBeNull();
		expect(anemic.banned_at).toBeNull();
		expect(anemic.loggedin_at).toBeNull();
		expect(anemic.created_at).toBe(created_at);
		expect(anemic.updated_at).toBeNull();
		expect(anemic.deleted_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
		expect(anemic.isDeleted).toBe(false);
	});

	it('should not update timestamp when same username provided', () => {
		const user = new UserAggregate(
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

		user.updateUsername(username);

		const anemic = user.toAnemic();
		expect(anemic.username).toBe(username);
		expect(anemic.updated_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
	});

	it('should update timestamp when different username provided', () => {
		const user = new UserAggregate(
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

		user.updateUsername(updatedUsername);

		const anemic = user.toAnemic();

		expect(anemic.username).toBe(updatedUsername);
		expect(anemic.updated_at).not.toBeNull();
		expect(anemic.isUpdated).toBe(true);
	});

	it('should handle null values for dates in constructor', () => {
		const user = new UserAggregate(
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
		const anemic = user.toAnemic();
		expect(anemic.updated_at).toBeNull();
		expect(anemic.deleted_at).toBeNull();
		expect(anemic.isUpdated).toBe(false);
		expect(anemic.isDeleted).toBe(false);
	});
});
