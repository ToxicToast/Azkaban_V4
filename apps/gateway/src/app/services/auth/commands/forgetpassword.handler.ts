import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ForgetPasswordCommand } from './forgetpassword.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthTopics, CacheService, CircuitService } from '@azkaban/shared';

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordCommandHandler
	implements ICommandHandler<ForgetPasswordCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly cacheService: CacheService,
		private readonly eventBus: EventBus,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: ForgetPasswordCommand) {
		const { email, username } = command;
		const topic = AuthTopics.FORGET_PASSWORD;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, { email, username })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: ForgetPasswordCommand) {
		const { email, username } = command;
		const topic = AuthTopics.FORGET_PASSWORD;
		const cacheKey = `${topic}.${email}.${username}`;
		const inCache = await this.cacheService.inCache(cacheKey);
		if (!inCache) {
			const response = await this.createCircuitBreaker(command)
				.then((res) => {
					this.cacheService.setKey(cacheKey, response);
					return res;
				})
				.catch((err) => {
					throw new HttpException(err.message, 503);
				});
			return response;
		}
		return await this.cacheService.getKey(cacheKey);
	}
}
