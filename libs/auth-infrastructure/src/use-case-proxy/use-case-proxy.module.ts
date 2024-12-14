import { DynamicModule, Module } from '@nestjs/common';
import {
	JwtModule,
	JwtService,
	KafkaModule,
	KafkaService,
	LoggerModule,
	LoggerService,
	BcryptModule,
	BcryptService,
} from '../services';
import { LoginUseCase } from '../use-cases';
import { UseCaseProxy } from '@toxictoast/sleepyazkaban-base-helpers';
import { LoginController, RegisterController } from '../controllers';

@Module({
	imports: [KafkaModule, JwtModule, LoggerModule, BcryptModule],
})
export class AuthUseCasesModule {
	static register(): DynamicModule {
		return {
			module: AuthUseCasesModule,
			providers: [
				{
					inject: [
						LoggerService,
						JwtService,
						KafkaService,
						BcryptService,
					],
					provide: LoginUseCase.name,
					useFactory: (
						logger: LoggerService,
						jwt: JwtService,
						kafka: KafkaService,
						bcrypt: BcryptService,
					) => {
						const useCase = new LoginUseCase(
							logger,
							jwt,
							kafka,
							bcrypt,
						);
						return new UseCaseProxy<LoginUseCase>(useCase);
					},
				},
			],
			controllers: [LoginController, RegisterController],
		};
	}
}
