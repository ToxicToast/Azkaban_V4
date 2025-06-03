import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { RejectReasonHelper } from '@azkaban/shared';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		let status = exception.getStatus() ?? 500;
		const message = exception.getResponse() as { message: string };
		const returnMessage =
			message.message === undefined ? message : message.message;
		const reason = RejectReasonHelper();
		const user = request?.['user'] ?? undefined;
		//
		if (returnMessage === 'Timed out') {
			status = 503;
		}
		//
		Logger.error(HttpExceptionFilter.name, {
			status,
			message,
			returnMessage,
			reason,
			user,
		});
		//
		response.status(status).json({
			statusCode: status,
			message: returnMessage,
			error: exception.name,
			reason,
			user,
		});
	}
}
