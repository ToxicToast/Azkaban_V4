import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { KafkaUserService } from '@azkaban/gateway-infrastructure';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly client: KafkaUserService) {}

	async onModuleInit(): Promise<void> {
		await this.client.onModuleInit();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.onModuleDestroy();
	}

	async getUsers() {
		return await this.client.onUsersList();
	}

	async getUserById(id: string) {
		return await this.client.onUserById({ id });
	}

	async createUser(email: string, username: string, password: string) {
		return await this.client.onUserCreate({ email, username, password });
	}

	async updateUser(
		id: string,
		username?: Optional<string>,
		password?: Optional<string>,
	) {
		return await this.client.onUserUpdate({ id, username, password });
	}

	async deleteUser(id: string) {
		return await this.client.onUserDelete({ id });
	}

	async restoreUser(id: string) {
		return await this.client.onUserRestore({ id });
	}

	async version() {
		return await this.client.onVersion();
	}
}
