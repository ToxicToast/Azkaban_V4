import { Wound } from './wound.valueObject';

describe('Wound ValueObject', () => {
	it('should create a Wound object when valid current and total values are provided', () => {
		const wound = new Wound(3, 5, 0);
		expect(wound.getCurrentWounds()).toBe(3);
		expect(wound.getTotalWounds()).toBe(5);
		expect(wound.getCriticalWounds()).toBe(0);
	});

	it('should add wound points correctly when within the total limit', () => {
		const initialWound = new Wound(3, 10, 0);
		const updatedWound = initialWound.addWounds(2);
		expect(updatedWound.getCurrentWounds()).toBe(5);
		expect(updatedWound.getTotalWounds()).toBe(10);
		expect(updatedWound.getCriticalWounds()).toBe(0);
	});

	it('should throw an error when creating a Wound object with negative current value', () => {
		expect(() => {
			new Wound(-1, 5, 0);
		}).toThrow('Current wounds must be greater than 0');
	});

	it('should throw an error when creating a Wound object with negative total value', () => {
		expect(() => {
			new Wound(3, -5, 0);
		}).toThrow('Total wounds must be greater than 0');
	});

	it('should throw an error when creating a Wound object with negative critical value', () => {
		expect(() => {
			new Wound(3, 3, -1);
		}).toThrow('Critical wounds can not be less than 0');
	});

	it('should add critical wounds correctly', () => {
		const wound = new Wound(3, 10, 0);
		expect(wound.getCriticalWounds()).toBe(0);
		const firstCriticalWound = wound.inflictCriticalWound();
		expect(firstCriticalWound.getCriticalWounds()).toBe(1);
		const secondCriticalWound = firstCriticalWound.inflictCriticalWound();
		expect(secondCriticalWound.getCriticalWounds()).toBe(2);
	});
});
