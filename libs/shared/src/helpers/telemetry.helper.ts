import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

export function TelemetryHelper(serviceName: string, serviceVersion: string) {
	const traceExporter = new ConsoleSpanExporter();
	const sdk = new NodeSDK({
		traceExporter,
		instrumentations: [
			getNodeAutoInstrumentations(),
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
