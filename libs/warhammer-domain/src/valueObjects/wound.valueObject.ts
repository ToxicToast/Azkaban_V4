export class Wound {
	constructor(
		private readonly current: number,
		private readonly total: number,
		private readonly critical: number,
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
		if (this.critical < 0) {
			throw new Error('Critical wounds can not be less than 0');
		}
	}

	equals(wound: number): boolean {
		return this.current === wound;
	}

	healWounds(wounds: number): Wound {
		const currentWounds = this.current - wounds;
		if (currentWounds < 0) {
			return new Wound(0, this.total, this.critical);
		}
		return new Wound(currentWounds, this.total, this.critical);
	}

	addWounds(wound: number): Wound {
		return new Wound(this.current + wound, this.total, this.critical);
	}

	inflictCriticalWound(): Wound {
		return new Wound(this.current, this.total, this.critical + 1);
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

	getCriticalWounds(): number {
		return this.critical;
	}
}
