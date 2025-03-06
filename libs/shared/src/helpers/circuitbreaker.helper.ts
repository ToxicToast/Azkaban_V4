import { ClientKafka, RpcException } from '@nestjs/microservices';
import { CircuitService } from '../modules';
import { HttpException, HttpStatus } from '@nestjs/common';

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
	return cicuitBreaker.execute().catch((error) => {
		if (error instanceof RpcException) {
			throw new HttpException(error.getError(), HttpStatus.BAD_GATEWAY);
		}
		throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
	});
}
