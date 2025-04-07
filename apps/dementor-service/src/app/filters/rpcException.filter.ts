import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
	catch(exception: RpcException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = 503;
		const message = exception.getError();
		response.status(status).json({
			statusCode: status,
			message: message,
			error: exception.name,
		});
	}
}
