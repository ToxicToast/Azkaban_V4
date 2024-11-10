import { Controller, Get, HttpException, Res } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@Controller('metrics')
export class MetricsController extends PrometheusController {
	@Get()
	index(@Res({ passthrough: true }) response: Response) {
		try {
			if (response !== undefined) {
				return super.index(response);
			}
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
