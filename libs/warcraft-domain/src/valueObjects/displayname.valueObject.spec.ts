import { DisplayName } from './displayname.valueObject';

describe('Displayname ValueObject', () => {
	it('should create a DisplayName instance with a string value', () => {
		const displayNameValue = 'John Doe';
		const displayName = new DisplayName(displayNameValue);
		expect(displayName.getDisplayName()).toBe(displayNameValue);
	});

	it('should create a DisplayName instance with null', () => {
		const displayName = new DisplayName(null);
		expect(displayName.getDisplayName()).toBeNull();
	});

	it('should return true when comparing with null if display name is null', () => {
		const displayName = new DisplayName(null);
		const result = displayName.equals(null);
		expect(result).toBe(true);
	});

	it('should return false when comparing with undefined', () => {
		const displayName = new DisplayName('John Doe');
		const result = displayName.equals(undefined);
		expect(result).toBe(false);
	});
});
