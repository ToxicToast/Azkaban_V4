import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEvents, UserTopics } from '@toxictoast/azkaban-broker-kafka';
import { CrudService } from './crud.service';
import {
	CreateUserDTO,
	DeleteUserDTO,
	RestoreUserDTO,
	UpdateUserDTO,
	UserByIdDTO,
} from '../../dto';
import { UserDAO } from '../../dao';
import { Nullable } from '@toxictoast/azkaban-base-types';

@Injectable()
export class KafkaUserService implements OnModuleInit, OnModuleDestroy {
	private readonly logger: Logger = new Logger(KafkaUserService.name);

	constructor(
		@Inject('AZKABAN_BROKER') private readonly client: ClientKafka,
		private readonly crudService: CrudService<UserDAO>,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(UserTopics.LIST);
		this.client.subscribeToResponseOf(UserTopics.ID);
		this.client.subscribeToResponseOf(UserTopics.CREATE);
		this.client.subscribeToResponseOf(UserTopics.UPDATE);
		this.client.subscribeToResponseOf(UserTopics.DELETE);
		this.client.subscribeToResponseOf(UserTopics.RESTORE);
		this.client.subscribeToResponseOf(UserTopics.VERSION);

		await this.client.connect().catch((error) => {
			this.logger.error(error);
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close().catch((error) => {
			this.logger.error(error);
		});
	}

	async onUsersList(): Promise<Array<UserDAO>> {
		return await this.crudService.onGetList(UserTopics.LIST);
	}

	async onUserById(data: UserByIdDTO): Promise<Nullable<UserDAO>> {
		return await this.crudService.onGetById(UserTopics.ID, data);
	}

	async onUserCreate(data: CreateUserDTO): Promise<UserDAO> {
		return await this.crudService.onCreate(
			UserTopics.CREATE,
			UserEvents.CREATE_SUCCESSFUL,
			UserEvents.CREATE_FAILED,
			data,
		);
	}

	async onUserUpdate(data: UpdateUserDTO): Promise<UserDAO> {
		return await this.crudService.onCreate(
			UserTopics.UPDATE,
			UserEvents.UPDATE_SUCCESSFUL,
			UserEvents.UPDATE_FAILED,
			data,
		);
	}

	async onUserDelete(data: DeleteUserDTO): Promise<UserDAO> {
		return await this.crudService.onCreate(
			UserTopics.DELETE,
			UserEvents.DELETE_SUCCESSFUL,
			UserEvents.DELETE_FAILED,
			data,
		);
	}

	async onUserRestore(data: RestoreUserDTO): Promise<UserDAO> {
		return await this.crudService.onCreate(
			UserTopics.RESTORE,
			UserEvents.RESTORE_SUCCESSFUL,
			UserEvents.RESTORE_FAILED,
			data,
		);
	}

	async onVersion(): Promise<string> {
		return await this.client
			.send(UserTopics.VERSION, {})
			.toPromise()
			.catch((error) => {
				this.logger.error(error);
			});
	}
}
