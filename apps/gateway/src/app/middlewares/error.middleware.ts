import { Request, Response, NextFunction } from 'express';
import { Response as AzkabanResponse } from '@azkaban/shared';
import { HttpException } from '@nestjs/common';

export function ErrorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	const originalSend = res.send;
	res.send = (body: unknown) => {
		console.error('Error Middleware', body);
		try {
			const jsonResponse: AzkabanResponse<unknown> =
				typeof body === 'string' ? JSON.parse(body) : body;
			if (jsonResponse.error !== null) {
				throw new HttpException(
					jsonResponse.error,
					jsonResponse.errorCode,
				);
			}
		} catch (error) {
			console.error(error);
			// Handle JSON Parsing Errors or unexpected cases
		}
		return originalSend.call(this, body);
	};
	next();
}
