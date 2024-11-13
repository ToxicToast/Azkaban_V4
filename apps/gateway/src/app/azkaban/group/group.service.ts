import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { KafkaGroupService } from '@azkaban/gateway-infrastructure';

@Injectable()
export class GroupService implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly client: KafkaGroupService) {}

	async onModuleInit(): Promise<void> {
		await this.client.onModuleInit();
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.onModuleDestroy();
	}

	async getGroups() {
		return await this.client.onGroupsList();
	}

	async getGroupById(id: string) {
		return await this.client.onGroupById({ id });
	}

	async createGroup(title: string) {
		return await this.client.onGroupCreate({ title });
	}

	async updateGroup(
		id: string,
		title?: Optional<string>,
		activated_at?: Optional<Nullable<Date>>,
	) {
		return await this.client.onGroupUpdate({ id, title, activated_at });
	}

	async deleteGroup(id: string) {
		return await this.client.onGroupDelete({ id });
	}

	async restoreGroup(id: string) {
		return await this.client.onGroupRestore({ id });
	}

	async version() {
		return await this.client.onVersion();
	}
}
