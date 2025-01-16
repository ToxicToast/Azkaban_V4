import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { HttpException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
	AzkabanAuthTopics,
	CacheService,
	CircuitService,
} from '@azkaban/shared';
import { LoginEvent } from '../events';
import { LoginDAO } from '../dao';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
	constructor(
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly cacheService: CacheService,
		private readonly eventBus: EventBus,
		private readonly circuit: CircuitService,
	) {}

	private createCircuitBreaker(command: LoginCommand) {
		const { username, password } = command;
		const topic = AzkabanAuthTopics.LOGIN;
		//
		const circuit = this.circuit.createCircuitBreaker(topic);
		circuit.fn(async () => {
			return await this.client
				.send(topic, { username, password })
				.toPromise();
		});
		return circuit.execute();
	}

	async execute(command: LoginCommand) {
		const { username, password } = command;
		const topic = AzkabanAuthTopics.LOGIN;
		const cacheKey = `${topic}.${username}.${password}`;
		const lowercaseCacheKey = cacheKey.toLowerCase();
		const inCache = await this.cacheService.inCache(lowercaseCacheKey);
		if (!inCache) {
			const response = await this.createCircuitBreaker(command)
				.then((res: LoginDAO) => {
					this.eventBus.publish(
						new LoginEvent(res.user.id, res.user.username),
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
