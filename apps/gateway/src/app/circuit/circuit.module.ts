import { Module } from '@nestjs/common';
import { CircuitModule as BaseModule } from '@azkaban/shared';

const global = true;
const config = {
	name: 'gateway',
	slidingWindowSize: 6,
	minimumNumberOfCalls: 3,
	failureRateThreshold: 60,
	slowCallDurationThreshold: 500,
	slowCallRateThreshold: 50,
	permittedNumberOfCallsInHalfOpenState: 2,
	openStateDelay: 10000,
	halfOpenStateMaxDelay: 30000,
	timeout: Number(process.env.CIRCUIT_BREAKER_TIMEOUT),
};

@Module({
	imports: [BaseModule.forRoot(global, config)],
})
export class CircuitModule {}
