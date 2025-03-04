import { UserDomain } from './user.domain';

describe('UserDomain', () => {
	let domain: UserDomain = new UserDomain(
		'123',
		'testuser',
		'test@example.com',
		'testpassword',
		null,
		null,
		null,
		new Date('01-01-2024'),
		null,
		null,
	);

	afterEach(() => {
		domain = new UserDomain(
			'123',
			'testuser',
			'test@example.com',
			'testpassword',
			null,
			null,
			null,
			new Date('01-01-2024'),
			null,
			null,
		);
	});

	it('should test if user is able to change username', () => {
		domain.changeUsername('newusername');
		expect(domain.toAnemic().username).toBe('newusername');
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to change email', () => {
		domain.changeEmail('newemail@example.com');
		expect(domain.toAnemic().email).toBe('newemail@example.com');
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to change password', () => {
		domain.changePassword('newpassword');
		expect(domain.toAnemic().password).toBe('newpassword');
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to get banned', () => {
		expect(domain.toAnemic().banned_at).toBeNull();
		domain.banUser();
		expect(domain.toAnemic().banned_at).not.toBeNull();
		expect(domain.toAnemic().activated_at).toBeNull();
		expect(domain.toAnemic().loggedin_at).toBeNull();
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to get unbanned', () => {
		domain.banUser();
		expect(domain.toAnemic().banned_at).not.toBeNull();
		domain.unbanUser();
		expect(domain.toAnemic().banned_at).toBeNull();
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to get activated', () => {
		expect(domain.toAnemic().activated_at).toBeNull();
		domain.activateUser();
		expect(domain.toAnemic().activated_at).not.toBeNull();
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});

	it('should test if user is able to get deactivated', () => {
		domain.activateUser();
		expect(domain.toAnemic().activated_at).not.toBeNull();
		domain.deactivateUser();
		expect(domain.toAnemic().activated_at).toBeNull();
		expect(domain.toAnemic().updated_at).not.toBeNull();
	});
});
