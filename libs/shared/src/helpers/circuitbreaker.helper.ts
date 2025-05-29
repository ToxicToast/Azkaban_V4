import { ClientKafka } from '@nestjs/microservices';
import { CircuitService } from '../modules';
import { HttpException, Logger } from '@nestjs/common';
import { Either } from '../types';

export function createCircuitBreaker<DataType>(
	data: DataType,
	topic: string,
	circuit: CircuitService,
	client: ClientKafka,
) {
	const cicuitBreaker = circuit.createCircuitBreaker(topic);
	cicuitBreaker.fn(async () => {
		return await client.send(topic, { ...data }).toPromise();
	});
	return cicuitBreaker
		.execute()
		.catch((error: { message: string; status: Either<string, number> }) => {
			Logger.error({ error }, createCircuitBreaker.name);
			const status =
				typeof error.status === 'string' ? 503 : error.status;
			throw new HttpException(error.message, status);
		})
		.finally(() => {
			cicuitBreaker.dispose();
		});
}
