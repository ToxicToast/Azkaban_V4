import { ClientKafka } from '@nestjs/microservices';
import { CircuitService } from '../modules';
import { HttpException, Logger } from '@nestjs/common';

export function createCircuitBreaker<DataType>(
	data: DataType,
	topic: string,
	circuit: CircuitService,
	client: ClientKafka,
) {
	const cicuitBreaker = circuit.createCircuitBreaker(topic);
	cicuitBreaker.fn(async () => {
		return await client.send(topic, data).toPromise();
	});
	return cicuitBreaker
		.execute()
		.catch((error: { message: string; status: number }) => {
			Logger.error(error, error.message, error.status, 'CircuitBreaker');
			throw new HttpException(error.message, error.status);
		})
		.finally(() => {
			cicuitBreaker.dispose();
		});
}
