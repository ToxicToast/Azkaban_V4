import { Injectable, Logger } from '@nestjs/common';
import { LoggerAdapter } from '@toxictoast/sleepyazkaban-base-domain';
import { LoggerHelper } from '@toxictoast/sleepyazkaban-base-helpers';

@Injectable()
export class LoggerService extends Logger implements LoggerAdapter {
	private readonly helper: LoggerHelper;

	constructor(context: string) {
		super(context);
		this.helper = new LoggerHelper(context);
	}

	debug(message: string) {
		this.helper.debug(message);
	}

	log(message: string) {
		this.helper.debug(message);
	}

	error(message: string, stack?: string) {
		this.helper.error(message, stack);
	}

	warn(message: string) {
		this.helper.warn(message);
	}

	verbose(message: string) {
		this.helper.verbose(message);
	}
}
