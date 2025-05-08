export class Wound {
	constructor(
		private readonly current: number,
		private readonly total: number,
	) {
		if (this.current < 0) {
			throw new Error('Current wounds must be greater than 0');
		}
		if (this.total < 0) {
			throw new Error('Total wounds must be greater than 0');
		}
		if (this.current > this.total) {
			throw new Error('Current wounds must be less than total wounds');
		}
	}

	equals(wound: number): boolean {
		return this.current === wound;
	}

	healWounds(wounds: number): Wound {
		const currentWounds = this.current - wounds;
		if (currentWounds < 0) {
			return new Wound(0, this.total);
		}
		return new Wound(currentWounds, this.total);
	}

	addWounds(wound: number): Wound {
		return new Wound(this.current + wound, this.total);
	}

	isCriticalWound(): boolean {
		return this.current >= this.total;
	}

	getCurrentWounds(): number {
		return this.current;
	}

	getTotalWounds(): number {
		return this.total;
	}
}
