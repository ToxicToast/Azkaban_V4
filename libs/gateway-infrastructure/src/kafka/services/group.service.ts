import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CrudService } from './crud.service';
import { GroupEvents, GroupTopics } from '@toxictoast/azkaban-broker-kafka';

@Injectable()
export class KafkaGroupService implements OnModuleInit, OnModuleDestroy {
	private readonly logger: Logger = new Logger(KafkaGroupService.name);

	constructor(
		@Inject('AZKABAN_BROKER') private readonly client: ClientKafka,
		private readonly crudService: CrudService<unknown>,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(GroupTopics.LIST);
		this.client.subscribeToResponseOf(GroupTopics.ID);
		this.client.subscribeToResponseOf(GroupTopics.CREATE);
		this.client.subscribeToResponseOf(GroupTopics.UPDATE);
		this.client.subscribeToResponseOf(GroupTopics.DELETE);
		this.client.subscribeToResponseOf(GroupTopics.RESTORE);
		this.client.subscribeToResponseOf(GroupTopics.VERSION);
		await this.client.connect().catch((error) => {
			this.logger.error(error);
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close().catch((error) => {
			this.logger.error(error);
		});
	}

	async onGroupsList(): Promise<unknown> {
		return await this.crudService.onGetList(GroupTopics.LIST);
	}

	async onGroupById(data: unknown): Promise<unknown> {
		return await this.crudService.onGetById(GroupTopics.ID, data);
	}

	async onGroupCreate(data: unknown): Promise<unknown> {
		return await this.crudService.onCreate(
			GroupTopics.CREATE,
			GroupEvents.CREATE_SUCCESSFUL,
			GroupEvents.CREATE_FAILED,
			data,
		);
	}

	async onGroupUpdate(data: unknown): Promise<unknown> {
		return await this.crudService.onCreate(
			GroupTopics.UPDATE,
			GroupEvents.UPDATE_SUCCESSFUL,
			GroupEvents.UPDATE_FAILED,
			data,
		);
	}

	async onGroupDelete(data: unknown): Promise<unknown> {
		return await this.crudService.onCreate(
			GroupTopics.DELETE,
			GroupEvents.DELETE_SUCCESSFUL,
			GroupEvents.DELETE_FAILED,
			data,
		);
	}

	async onGroupRestore(data: unknown): Promise<unknown> {
		return await this.crudService.onCreate(
			GroupTopics.RESTORE,
			GroupEvents.RESTORE_SUCCESSFUL,
			GroupEvents.RESTORE_FAILED,
			data,
		);
	}

	async onVersion(): Promise<string> {
		return await this.client
			.send(GroupTopics.VERSION, {})
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
			});
	}
}
