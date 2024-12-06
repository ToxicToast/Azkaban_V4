import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { AuthTopics, KafkaService } from '@toxictoast/sleepyazkaban-kafka';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly kafkaClient: KafkaService) {}

	async onModuleInit(): Promise<void> {
		console.error(this.kafkaClient);
	}

	async onModuleDestroy(): Promise<void> {
		await this.kafkaClient.disconnect();
	}

	async register(data: RegisterDTO): Promise<unknown> {
		const { username, email, password } = data;
		return this.kafkaClient
			.emitResponse(AuthTopics.REGISTER, { username, email, password })
			.toPromise();
	}

	async login(data: LoginDTO): Promise<unknown> {
		const { email, password } = data;
		return this.kafkaClient
			.emitResponse(AuthTopics.LOGIN, { email, password })
			.toPromise();
	}
}
