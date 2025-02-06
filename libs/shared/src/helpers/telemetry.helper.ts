import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

export function TelemetryHelper(
	telemetryUrl: string,
	serviceName: string,
	serviceVersion: string,
) {
	if (serviceVersion !== 'local') {
		const exporterOptions = {
			url: telemetryUrl,
		};

		const traceExporter = new OTLPTraceExporter(exporterOptions);
		const sdk = new NodeSDK({
			traceExporter,
			instrumentations: [
				new NestInstrumentation(),
				new HttpInstrumentation(),
				new ExpressInstrumentation(),
			],
			resource: new Resource({
				[ATTR_SERVICE_NAME]: serviceName,
				[ATTR_SERVICE_VERSION]: serviceVersion,
			}),
		});

		return sdk;
	} else {
		const traceExporter = new ConsoleSpanExporter();
		const sdk = new NodeSDK({
			traceExporter,
			instrumentations: [],
			resource: new Resource({
				[ATTR_SERVICE_NAME]: serviceName + '-local',
				[ATTR_SERVICE_VERSION]: serviceVersion,
			}),
		});

		return sdk;
	}
}
