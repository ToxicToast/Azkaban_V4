import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthTopics, CacheService, CircuitService } from '@azkaban/shared';
import { RegisterDAO } from '../dao';
import { RegisterEvent } from '../events';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler
	implements ICommandHandler<RegisterCommand>
{
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly cacheService: CacheService,
		private readonly eventBus: EventBus,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: RegisterCommand) {
		const { email, username, password } = command;
		const topic = AuthTopics.REGISTER;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, { email, username })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: RegisterCommand) {
		const { email, username, password } = command;
		const topic = AuthTopics.REGISTER;
		const cacheKey = `${topic}.${email}.${username}.${password}`;
		const lowercaseCacheKey = cacheKey.toLowerCase();
		const inCache = await this.cacheService.inCache(lowercaseCacheKey);
		if (!inCache) {
			const response = await this.createCircuitBreaker(command)
				.then((res: RegisterDAO) => {
					this.eventBus.publish(
						new RegisterEvent(
							res.user.id,
							res.user.email,
							res.user.username,
						),
					);
					this.cacheService.setKey(lowercaseCacheKey, res);
					return res;
				})
				.catch((err) => {
					throw new HttpException(err.message, err.status ?? 503);
				});
			return response;
		}
		return await this.cacheService.getKey(lowercaseCacheKey);
	}
}
