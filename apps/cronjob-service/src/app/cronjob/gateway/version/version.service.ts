import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VersionService {
	private readonly logger: Logger = new Logger(VersionService.name);

	constructor(
		@Inject('GATEWAY_URL') private readonly gatewayUrl: string,
		private readonly httpService: HttpService,
	) {}

	async refreshVersion(): Promise<unknown> {
		const url = `${this.gatewayUrl}/version`;
		return await this.httpService
			.get(url, {
				headers: {
					timeout: '40000',
				},
			})
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
			});
	}
}
