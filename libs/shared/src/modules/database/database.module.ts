import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { DataSource, EntitySchema, EntityTarget, MixedList } from 'typeorm';
import { Either } from '../../types';

@Module({})
export class DatabaseModule {
	static forRoot(
		global: boolean,
		environment: string,
		database: DatabaseConfig,
		entities: unknown,
	): DynamicModule {
		return {
			module: DatabaseModule,
			providers: [
				{
					provide: 'DATA_SOURCE',
					useFactory: () => {
						const castEntities = entities as MixedList<
							Either<EntitySchema, string>
						>;

						if (environment.includes('test')) {
							return new DataSource({
								type: 'sqlite',
								database: ':memory:',
								dropSchema: true,
								synchronize: true,
								logging: true,
								entities: castEntities,
							}).initialize();
						} else {
							const castType = database.databaseType as Either<
								'postgres',
								'mariadb'
							>;
							return new DataSource({
								type: castType,
								host: database.databaseHost,
								port: database.databasePort,
								username: database.databaseUsername,
								password: database.databasePassword,
								database: database.databaseTable,
								entities: castEntities,
								synchronize: true,
							}).initialize();
						}
					},
				},
			],
			exports: ['DATA_SOURCE'],
			global,
		};
	}

	static forFeature(
		global: boolean,
		provide: string,
		entity: EntityTarget<unknown>,
	): DynamicModule {
		return {
			module: DatabaseModule,
			providers: [
				{
					provide,
					useFactory: (dataSource: DataSource) => {
						return dataSource.getRepository(entity);
					},
					inject: ['DATA_SOURCE'],
				},
			],
			exports: [provide],
			global,
		};
	}
}
