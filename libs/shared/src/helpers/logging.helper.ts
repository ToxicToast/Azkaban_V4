export function LoggingHelper(level: string, message: string, context: any) {
	return {
		level,
		message,
		timestamp: new Date().toISOString(),
		context,
	};
}
