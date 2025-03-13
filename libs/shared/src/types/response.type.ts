import { Nullable } from './nullable.type';

export type Response<DataType> = {
	data: Nullable<DataType>;
	error: Nullable<string>;
	errorCode: Nullable<number>;
};
