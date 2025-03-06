import { DynamicModule, Module } from '@nestjs/common';
import { CircuitConfig } from './circuit.config';
import { Fallback, SlidingCountBreaker, Timeout } from 'mollitia';
import { CircuitService } from './circuit.service';

@Module({})
export class CircuitModule {
	static forRoot(global: boolean, config: CircuitConfig): DynamicModule {
		return {
			module: CircuitModule,
			providers: [
				{
					provide: 'CIRCUIT_CONFIG',
					useValue: new SlidingCountBreaker({
						name: config.name,
						slidingWindowSize: config.slidingWindowSize,
						minimumNumberOfCalls: config.minimumNumberOfCalls,
						failureRateThreshold: config.failureRateThreshold,
						slowCallDurationThreshold:
							config.slowCallDurationThreshold,
						slowCallRateThreshold: config.slowCallRateThreshold,
						permittedNumberOfCallsInHalfOpenState:
							config.permittedNumberOfCallsInHalfOpenState,
						openStateDelay: config.openStateDelay,
						halfOpenStateMaxDelay: config.halfOpenStateMaxDelay,
					}),
				},
				{
					provide: 'CIRCUIT_FALLBACK',
					useValue: new Fallback({
						callback: () => {
							return {
								message: 'Service is currently unavailable',
							};
						},
					}),
				},
				{
					provide: 'CIRCUIT_TIMEOUT',
					useValue: new Timeout({
						delay: config.timeout,
					}),
				},
				CircuitService,
			],
			exports: [CircuitService],
			global,
		};
	}
}
