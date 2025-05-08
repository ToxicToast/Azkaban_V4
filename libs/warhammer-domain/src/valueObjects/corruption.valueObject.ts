export class Corruption {
	constructor(
		private readonly current: number,
		private readonly total: number,
	) {
		if (this.current < 0) {
			throw new Error('Current corruption must be greater than 0');
		}
		if (this.total < 0) {
			throw new Error('Total corruption must be greater than 0');
		}
		if (this.current > this.total) {
			throw new Error(
				'Current corruption must be less than total corruption',
			);
		}
	}

	equals(corruption: number): boolean {
		return this.current === corruption;
	}

	addCorruption(corruption: number): Corruption {
		const currentCorruption = this.current + corruption;
		if (currentCorruption > this.total) {
			return new Corruption(this.total, this.total);
		}
		return new Corruption(this.current + corruption, this.total);
	}

	cleanseCorruption(corruption: number): Corruption {
		const currentCorruption = this.current - corruption;
		if (currentCorruption < 0) {
			return new Corruption(0, this.total);
		}
		return new Corruption(currentCorruption, this.total);
	}

	getCurrentCorruption(): number {
		return this.current;
	}

	getTotalCorruption(): number {
		return this.total;
	}
}
