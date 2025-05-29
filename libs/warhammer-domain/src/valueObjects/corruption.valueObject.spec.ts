import { Corruption } from './corruption.valueObject';

describe('Corruption ValueObject', () => {
	it('should create a Corruption object when valid current and total values are provided', () => {
		const corruption = new Corruption(3, 5);
		expect(corruption.getCurrentCorruption()).toBe(3);
		expect(corruption.getTotalCorruption()).toBe(5);
	});

	it('should add corruption points correctly when within the total limit', () => {
		const initialCorruption = new Corruption(3, 10);
		const updatedCorruption = initialCorruption.addCorruption(2);
		expect(updatedCorruption.getCurrentCorruption()).toBe(5);
		expect(updatedCorruption.getTotalCorruption()).toBe(10);
	});

	it('should throw an error when creating a Corruption object with negative current value', () => {
		expect(() => {
			new Corruption(-1, 5);
		}).toThrow('Current corruption must be greater than 0');
	});

	it('should throw an error when creating a Corruption object with negative total value', () => {
		expect(() => {
			new Corruption(3, -5);
		}).toThrow('Total corruption must be greater than 0');
	});
});
