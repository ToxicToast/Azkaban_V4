import { Nullable, Optional, Response } from '../types';

export function BuildResponse<DataType>(
	data: Nullable<DataType>,
	error?: Optional<string>,
	errorCode?: Optional<number>,
): Response<DataType> {
	return {
		data,
		error: error ?? null,
		errorCode: errorCode ?? null,
	};
}
