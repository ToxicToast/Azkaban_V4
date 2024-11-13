import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CrudService<ModelType> {
	private readonly logger: Logger = new Logger(CrudService.name);

	constructor(
		@Inject('AZKABAN_BROKER') private readonly client: ClientKafka,
	) {}

	async onSuccessEvent<DataType>(
		topic: string,
		data: DataType,
	): Promise<void> {
		await this.client
			.emit(topic, data)
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
				throw error;
			});
	}

	async onFailedEvent<DataType>(
		topic: string,
		data: DataType,
	): Promise<void> {
		await this.client
			.emit(topic, data)
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
				throw error;
			});
	}

	async onGetList(topic: string): Promise<Array<ModelType>> {
		return await this.client
			.send(topic, {})
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
				throw error;
			});
	}

	async onGetById<DataType>(
		topic: string,
		data: DataType,
	): Promise<Nullable<ModelType>> {
		return await this.client
			.send(topic, data)
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
				throw error;
			});
	}

	async onCreate<DataType>(
		topic: string,
		successTopic: string,
		failedTopic: string,
		data: DataType,
	): Promise<ModelType> {
		return await this.client
			.send(topic, data)
			.toPromise()
			.then(async (response) => {
				Logger.debug({ successTopic, response });
				await this.onSuccessEvent(successTopic, response);
				return response;
			})
			.catch(async (error) => {
				Logger.debug({ failedTopic, data });
				await this.onFailedEvent(failedTopic, data);
				this.logger.error(error);
				throw error;
			});
	}
}
