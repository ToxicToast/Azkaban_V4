export interface CircuitConfig {
	name: string;
	slidingWindowSize: number;
	minimumNumberOfCalls: number;
	failureRateThreshold: number;
	slowCallDurationThreshold: number;
	slowCallRateThreshold: number;
	permittedNumberOfCallsInHalfOpenState: number;
	openStateDelay: number;
	halfOpenStateMaxDelay: number;
	timeout: number;
}
