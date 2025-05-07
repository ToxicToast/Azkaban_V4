import { DisplayRealm } from './displayrealm.valueObject';

describe('Displayrealm ValueObject', () => {
	it('should create a DisplayRealm instance with a string value', () => {
		const displayRealmValue = 'John Doe';
		const displayRealm = new DisplayRealm(displayRealmValue);
		expect(displayRealm.getDisplayRealm()).toBe(displayRealmValue);
	});

	it('should create a DisplayRealm instance with null', () => {
		const displayRealm = new DisplayRealm(null);
		expect(displayRealm.getDisplayRealm()).toBeNull();
	});

	it('should return true when comparing with null if display realm is null', () => {
		const displayRealm = new DisplayRealm(null);
		const result = displayRealm.equals(null);
		expect(result).toBe(true);
	});

	it('should return false when comparing with undefined', () => {
		const displayRealm = new DisplayRealm('John Doe');
		const result = displayRealm.equals(undefined);
		expect(result).toBe(false);
	});
});
