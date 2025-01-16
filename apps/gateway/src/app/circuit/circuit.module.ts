import { Module } from '@nestjs/common';
import { CircuitModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../app.config';

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
	timeout: AppConfig.circuit.timeout,
};

@Module({
	imports: [BaseModule.forRoot(global, config)],
})
export class CircuitModule {}
