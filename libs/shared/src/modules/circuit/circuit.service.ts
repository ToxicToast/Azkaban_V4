import { Inject, Injectable } from '@nestjs/common';
import { Circuit, SlidingCountBreaker, Timeout } from 'mollitia';

@Injectable()
export class CircuitService {
	constructor(
		@Inject('CIRCUIT_CONFIG')
		private readonly slidingCountBreaker: SlidingCountBreaker,
		@Inject('CIRCUIT_TIMEOUT')
		private readonly timeout: Timeout,
	) {}

	createCircuitBreaker(name: string): Circuit {
		return new Circuit({
			name,
			options: {
				modules: [this.slidingCountBreaker, this.timeout],
			},
		});
	}
}
