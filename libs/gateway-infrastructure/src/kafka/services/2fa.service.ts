import {
	Inject,
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CrudService } from './crud.service';
import { AuthDAO } from '../../dao';
import { Response } from 'express';
import {
	TwoFactorEvents,
	TwoFactorTopics,
} from '@toxictoast/azkaban-broker-kafka';

@Injectable()
export class Kafka2FAService implements OnModuleInit, OnModuleDestroy {
	private readonly logger: Logger = new Logger(Kafka2FAService.name);

	constructor(
		@Inject('AZKABAN_BROKER') private readonly client: ClientKafka,
		private readonly crudService: CrudService<unknown>,
	) {}

	async onModuleInit(): Promise<void> {
		this.client.subscribeToResponseOf(TwoFactorTopics.GENERATE_SECRET);
		this.client.subscribeToResponseOf(TwoFactorTopics.GENERATE_QRCODE);
		this.client.subscribeToResponseOf(TwoFactorTopics.VERIFY);
		await this.client.connect().catch((error) => {
			this.logger.error(error);
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.client.close().catch((error) => {
			this.logger.error(error);
		});
	}

	async onGenerateSecret(user: AuthDAO): Promise<unknown> {
		return await this.crudService.onCreate(
			TwoFactorTopics.GENERATE_SECRET,
			TwoFactorEvents.GENERATE_SECRET_SUCCESSFUL,
			TwoFactorEvents.GENERATE_SECRET_FAILED,
			user,
		);
	}

	async generateQRCode(stream: Response, url: string): Promise<unknown> {
		return await this.crudService.onCreate(
			TwoFactorTopics.GENERATE_QRCODE,
			TwoFactorEvents.GENERATE_QRCODE_SUCCESSFUL,
			TwoFactorEvents.GENERATE_QRCODE_FAILED,
			{ stream, url },
		);
	}

	async onVerify(code: string, user: AuthDAO): Promise<unknown> {
		return await this.crudService.onCreate(
			TwoFactorTopics.VERIFY,
			TwoFactorEvents.VERIFY_SUCCESSFUL,
			TwoFactorEvents.VERIFY_FAILED,
			{ code, user },
		);
	}
}
