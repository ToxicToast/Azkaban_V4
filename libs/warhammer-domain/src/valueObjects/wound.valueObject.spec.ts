import { Wound } from './wound.valueObject';

describe('Wound ValueObject', () => {
	it('should create a Wound object when valid current and total values are provided', () => {
		const fate = new Wound(3, 5);
		expect(fate.getCurrentWounds()).toBe(3);
		expect(fate.getTotalWounds()).toBe(5);
	});

	it('should add fate points correctly when within the total limit', () => {
		const initialWound = new Wound(3, 10);
		const updatedWound = initialWound.addWounds(2);
		expect(updatedWound.getCurrentWounds()).toBe(5);
		expect(updatedWound.getTotalWounds()).toBe(10);
	});

	it('should throw an error when creating a Wound object with negative current value', () => {
		expect(() => {
			new Wound(-1, 5);
		}).toThrow('Current wounds must be greater than 0');
	});

	it('should throw an error when creating a Wound object with negative total value', () => {
		expect(() => {
			new Wound(3, -5);
		}).toThrow('Total wounds must be greater than 0');
	});
});
