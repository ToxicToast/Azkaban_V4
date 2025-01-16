import { Inject, Injectable } from '@nestjs/common';
import { CacheService, VersionCache, versionFolder } from '@azkaban/shared';
import { AzkabanVersionsService } from './azkaban-versions.service';
import { FoodfolioVersionsService } from './foodfolio-versions.service';
import { TwitchVersionsService } from './twitch-versions.service';
import { WarcraftVersionsService } from './warcraft-versions.service';
import { CoworkingVersionsService } from './coworking-versions.service';

@Injectable()
export class VersionService {
	constructor(
		@Inject('APP_VERSION') private readonly appVersion: string,
		private readonly azkaban: AzkabanVersionsService,
		private readonly foodfolio: FoodfolioVersionsService,
		private readonly twitch: TwitchVersionsService,
		private readonly warcraft: WarcraftVersionsService,
		private readonly coworking: CoworkingVersionsService,
		private readonly cacheService: CacheService,
	) {}

	private gatewayVersion(): string {
		return this.appVersion;
	}

	private async azkabanVersion(): Promise<unknown> {
		return await this.azkaban.getVersions();
	}

	private async foodfolioVersion(): Promise<unknown> {
		return await this.foodfolio.getVersions();
	}

	private async twitchVersion(): Promise<unknown> {
		return await this.twitch.getVersions();
	}

	private async warcraftVersion(): Promise<unknown> {
		return await this.warcraft.getVersions();
	}

	private async coworkingVersion(): Promise<unknown> {
		return await this.coworking.getVersions();
	}

	async generateVersions(): Promise<unknown> {
		const cacheKey = `${versionFolder}:${VersionCache.AZKABANGATEWAY}`;
		const inCache = await this.cacheService.inCache(cacheKey);
		if (!inCache) {
			const gateway = this.gatewayVersion();
			const azkaban = await this.azkabanVersion();
			const foodfolio = await this.foodfolioVersion();
			const twitch = await this.twitchVersion();
			const warcraft = await this.warcraftVersion();
			const coworking = await this.coworkingVersion();
			//
			const versions = {
				gateway,
				azkaban,
				foodfolio,
				twitch,
				warcraft,
				coworking,
			};
			//
			await this.cacheService.setKey(cacheKey, versions);
			return versions;
		}
		return this.cacheService.getKey(cacheKey);
	}
}
