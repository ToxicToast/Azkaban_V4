import { Controller, Get } from '@nestjs/common';
import { HealthLinks, HealthService } from '@azkaban/gateway-infrastructure';

@Controller(HealthLinks.CONTROLLER)
export class HealthController {
	constructor(private readonly service: HealthService) {}

	@Get()
	check() {
		return this.service.check();
	}
}
