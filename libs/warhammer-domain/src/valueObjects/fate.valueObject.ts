export class Fate {
	constructor(
		private readonly current: number,
		private readonly total: number,
	) {
		if (this.current < 0) {
			throw new Error('Current fate must be greater than 0');
		}
		if (this.total < 0) {
			throw new Error('Total fate must be greater than 0');
		}
		if (this.current > this.total) {
			throw new Error('Current fate must be less than total fate');
		}
	}

	equals(fate: number): boolean {
		return this.current === fate;
	}

	addFate(fate: number): Fate {
		const currentFate = this.current + fate;
		if (currentFate > this.total) {
			return new Fate(this.total, this.total);
		}
		return new Fate(this.current + fate, this.total);
	}

	useFate(fate: number): Fate {
		const currentFate = this.current - fate;
		if (currentFate < 0) {
			return new Fate(0, this.total);
		}
		return new Fate(currentFate, this.total);
	}

	getCurrentFate(): number {
		return this.current;
	}

	getTotalFate(): number {
		return this.total;
	}
}
