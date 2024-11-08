import { Controller, Get } from '@nestjs/common';
import { VersionLinks } from '@azkaban/gateway-infrastructure';
import { VersionsService } from './versions.service';

@Controller(VersionLinks.CONTROLLER)
export class VersionsController {
	constructor(private readonly service: VersionsService) {}

	@Get()
	async getVersions() {
		const gateway = await this.service.gatewayVersion();
		const azkaban = await this.service.azkabanVersion();
		const foodfolio = await this.service.foodfolioVersion();
		const twitch = await this.service.twitchVersion();
		const warcraft = await this.service.warcraftVersion();
		const coworking = await this.service.coworkingVersion();
		//
		return {
			gateway,
			azkaban,
			foodfolio,
			twitch,
			warcraft,
			coworking,
		};
	}
}
