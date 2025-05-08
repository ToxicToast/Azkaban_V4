import { Fate } from './fate.valueObject';

describe('Fate ValueObject', () => {
	it('should create a Fate object when valid current and total values are provided', () => {
		const fate = new Fate(3, 5);
		expect(fate.getCurrentFate()).toBe(3);
		expect(fate.getTotalFate()).toBe(5);
	});

	it('should add fate points correctly when within the total limit', () => {
		const initialFate = new Fate(3, 10);
		const updatedFate = initialFate.addFate(2);
		expect(updatedFate.getCurrentFate()).toBe(5);
		expect(updatedFate.getTotalFate()).toBe(10);
	});

	it('should throw an error when creating a Fate object with negative current value', () => {
		expect(() => {
			new Fate(-1, 5);
		}).toThrow('Current fate must be greater than 0');
	});

	it('should throw an error when creating a Fate object with negative total value', () => {
		expect(() => {
			new Fate(3, -5);
		}).toThrow('Total fate must be greater than 0');
	});
});
