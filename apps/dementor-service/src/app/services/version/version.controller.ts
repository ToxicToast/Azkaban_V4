import { Controller, Get } from '@nestjs/common';
import { ControllerHelper } from '@azkaban/shared';
import { Span } from 'nestjs-otel';
import { VersionService } from './version.service';

@Controller(ControllerHelper('version'))
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@Span('dementor.version')
	@Get('/')
	async getVersions() {
		const azkabanVersion = await this.service
			.getAzkabanServiceVersion()
			.catch(() => {
				return 'n/a';
			});
		const dementorVersion = await this.service
			.getDementorServiceVersion()
			.catch(() => {
				return 'n/a';
			});
		const warcraftVersion = await this.service
			.getWarcraftServiceVersion()
			.catch(() => {
				return 'n/a';
			});

		return {
			dementor: dementorVersion,
			azkaban: {
				alerts: azkabanVersion,
				groups: 'n/a',
				users: azkabanVersion,
			},
			sse: 'n/a',
			warcraft: {
				api: warcraftVersion,
				characters: warcraftVersion,
				guilds: warcraftVersion,
				cronjobs: {
					assets: warcraftVersion,
					character: warcraftVersion,
					guild: 'n/a',
					mythic: warcraftVersion,
					raid: 'n/a',
				},
			},
		};
	}
}
