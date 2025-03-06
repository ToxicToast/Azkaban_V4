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
import { FastifyOtelInstrumentation } from '@fastify/otel';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { RedisInstrumentation } from '@opentelemetry/instrumentation-redis';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';

export function TelemetryHelper(
	telemetryUrl: string,
	serviceName: string,
	serviceVersion: string,
) {
	const exporterOptions = {
		url: telemetryUrl,
		plugins: {
			kafkajs: {
				enabled: false,
				path: 'open-telemetry-plugin-kafkajs',
			},
		},
	};

	const traceExporter = new OTLPTraceExporter(exporterOptions);
	const sdk = new NodeSDK({
		traceExporter,
		instrumentations: [
			new NestInstrumentation({
				enabled: true,
			}),
			new HttpInstrumentation({
				enabled: true,
			}),
			new ExpressInstrumentation({
				enabled: true,
			}),
			new RedisInstrumentation({
				enabled: true,
			}),
			new FastifyOtelInstrumentation({
				servername: serviceName,
				registerOnInitialization: true,
			}),
			new KafkaJsInstrumentation({
				enabled: true,
			}),
		],
		resource: new Resource({
			[ATTR_SERVICE_NAME]: serviceName,
			[ATTR_SERVICE_VERSION]: serviceVersion,
		}),
	});
	return sdk;
}
