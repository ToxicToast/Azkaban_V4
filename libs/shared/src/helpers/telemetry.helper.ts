import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export function TelemetryHelper(
	telemetryUrl: string,
	serviceName: string,
	serviceVersion: string,
) {
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
			[SemanticResourceAttributes.SERVICE_NAME]: serviceName,
			[SemanticResourceAttributes.SERVICE_VERSION]: serviceVersion,
		}),
	});

	sdk.start();

	// gracefully shut down the SDK on process exit
	process.on('SIGTERM', () => {
		sdk.shutdown()
			.then(() => console.log('Tracing terminated'))
			.catch((error) => console.log('Error terminating tracing', error))
			.finally(() => process.exit(0));
	});

	return sdk;
}
