import { Either, Optional } from '../types';
import {
	onErrorValueError,
	onNoErrorMessageError,
	onSuccessError,
	onValueError,
} from './errors';

export class Result<ValueType> {
	private _isSuccess: boolean;
	private _isFailure: boolean;
	private _error?: Optional<Either<ValueType, string>>;
	private _value?: Optional<ValueType>;

	constructor(
		isSuccess: boolean,
		error?: Optional<Either<ValueType, string>>,
		value?: Optional<ValueType>,
	) {
		if (isSuccess && error) {
			throw new onSuccessError();
		}
		if (!isSuccess && !error) {
			throw new onNoErrorMessageError();
		}
		this._isSuccess = isSuccess;
		this._isFailure = !isSuccess;
		this._error = error;
		this._value = value;
		Object.freeze(this);
	}

	get value(): Optional<ValueType> {
		if (!this._isSuccess) {
			throw new onErrorValueError();
		}
		return this._value;
	}

	get errorValue(): Optional<Either<ValueType, string>> {
		if (!this._isFailure) {
			throw new onValueError();
		}
		return this._error;
	}

	get isSuccess(): boolean {
		return this._isSuccess;
	}

	get isFailure(): boolean {
		return this._isFailure;
	}

	public static ok<ResultType>(
		value?: Optional<ResultType>,
	): Result<ResultType> {
		return new Result<ResultType>(true, undefined, value);
	}

	public static fail<ResultType>(
		error: Either<ResultType, string>,
	): Result<ResultType> {
		return new Result<ResultType>(false, error);
	}
}
