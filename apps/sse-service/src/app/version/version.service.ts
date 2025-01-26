import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
	constructor(@Inject('APP_VERSION') private readonly version: string) {}

	appVersion(): string {
		return this.version ?? 'n/a';
	}
}
