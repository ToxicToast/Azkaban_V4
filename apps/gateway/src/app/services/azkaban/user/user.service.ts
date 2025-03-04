import { HttpException, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CreateQuery, IdQuery, ListQuery } from './queries';
import { UserDAO } from '@azkaban/user-infrastructure';
import { Response } from '@azkaban/shared';

@Injectable()
export class UserService {
	constructor(private readonly queryBus: QueryBus) {}

	async userList(): Promise<Array<UserDAO>> {
		try {
			const response = await this.queryBus.execute<
				ListQuery,
				Response<Array<UserDAO>>
			>(new ListQuery());
			if (response.error !== null) {
				throw new HttpException(response.error, response.errorCode);
			}
			return response.data;
		} catch (error) {
			throw new HttpException(error, 500);
		}
	}

	async userById(id: string): Promise<UserDAO> {
		try {
			const response = await this.queryBus.execute<
				IdQuery,
				Response<UserDAO>
			>(new IdQuery(id));
			if (response.error !== null) {
				throw new HttpException(response.error, response.errorCode);
			}
			return response.data;
		} catch (error) {
			throw new HttpException(error, 500);
		}
	}

	async createUser(
		username: string,
		email: string,
		password: string,
	): Promise<UserDAO> {
		try {
			const response = await this.queryBus.execute<
				CreateQuery,
				Response<UserDAO>
			>(new CreateQuery(username, email, password));
			if (response.error !== null) {
				throw new HttpException(response.error, response.errorCode);
			}
			return response.data;
		} catch (error) {
			throw new HttpException(error, 500);
		}
	}
}
