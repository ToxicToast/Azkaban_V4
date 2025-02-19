import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	async userList(): Promise<Array<unknown>> {
		return [];
	}
}
