import { Module } from '@nestjs/common';
import { CircuitModule as BaseModule } from '@azkaban/shared';
import { AppConfig } from '../../config';

const config = {
	name: AppConfig.name,
	slidingWindowSize: 6,
	minimumNumberOfCalls: 10,
	failureRateThreshold: 60,
	slowCallDurationThreshold: 500,
	slowCallRateThreshold: 50,
	permittedNumberOfCallsInHalfOpenState: 10,
	openStateDelay: 10000,
	halfOpenStateMaxDelay: 30000,
	timeout: AppConfig.circuit.timeout,
};

@Module({
	imports: [BaseModule.forRoot(true, config)],
})
export class CircuitModule {}
