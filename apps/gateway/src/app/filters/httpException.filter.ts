import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus() ?? 500;
		const message = exception.getResponse() as { message: string };
		const returnMessage =
			message.message === undefined ? message : message.message;
		response.status(status).json({
			statusCode: status,
			message: returnMessage,
			error: exception.name,
		});
	}
}
