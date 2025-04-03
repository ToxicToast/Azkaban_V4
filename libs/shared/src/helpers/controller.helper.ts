import { ControllerOptions } from '@nestjs/common/decorators/core/controller.decorator';

export function ControllerHelper(
	route: string,
	version = '1',
): ControllerOptions {
	return {
		path: route,
		version,
	};
}
