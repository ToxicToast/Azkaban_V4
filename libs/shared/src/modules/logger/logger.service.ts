import {
	Injectable,
	LoggerService as BaseService,
	Inject,
} from '@nestjs/common';
import * as winston from 'winston';
import { trace, context } from '@opentelemetry/api';

@Injectable()
export class LoggerService implements BaseService {
	private readonly logger: winston.Logger;

	constructor(@Inject('SERVICE_NAME') private readonly serviceName: string) {
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			defaultMeta: {
				service: this.serviceName,
			},
			transports: [new winston.transports.Console()],
		});
	}

	private getTraceContext() {
		const span = trace.getSpan(context.active());
		const spanContext = span?.spanContext();
		return spanContext
			? {
					traceId: spanContext.traceId,
					spanId: spanContext.spanId,
				}
			: {};
	}

	log(message: any, context?: string) {
		this.logger.info({ message, context, ...this.getTraceContext() });
	}

	error(message: any, trace?: string, context?: string) {
		this.logger.error({
			message,
			trace,
			context,
			...this.getTraceContext(),
		});
	}

	warn(message: any, context?: string) {
		this.logger.warn({ message, context, ...this.getTraceContext() });
	}

	debug(message: any, context?: string) {
		this.logger.debug({ message, context, ...this.getTraceContext() });
	}

	verbose(message: any, context?: string) {
		this.logger.verbose({ message, context, ...this.getTraceContext() });
	}
}
