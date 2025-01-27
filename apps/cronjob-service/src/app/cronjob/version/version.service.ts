import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClientKafka } from '@nestjs/microservices';
import { CronjobEvents } from '@azkaban/shared';
import { AxiosResponse } from 'axios';

@Injectable()
export class VersionService {
	private readonly logger: Logger = new Logger(VersionService.name);

	constructor(
		@Inject('GATEWAY_URL') private readonly gatewayUrl: string,
		@Inject('GATEWAY_SERVICE') private readonly client: ClientKafka,
		private readonly httpService: HttpService,
	) {}

	async refreshVersion(): Promise<void> {
		const url = `${this.gatewayUrl}/version`;
		await this.httpService
			.get(url)
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
			})
			.then((data: AxiosResponse<unknown>) => {
				this.client.emit(CronjobEvents.VERSION, {
					version: data.data,
				});
			});
	}
}
