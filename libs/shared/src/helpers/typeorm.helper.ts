import { DataSource, EntitySchema, MixedList } from 'typeorm';
import { Either } from '../types';
import { buildProdProvider, buildTestProvider } from './providerBuilder';

export function TypeORMHelper(
	environment: string,
	type: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	table: string,
	entities: MixedList<string | EntitySchema>,
): Promise<DataSource> {
	const castType = type as Either<'postgres', 'mariadb'>;
	const isTest = environment.includes('test');
	const dataSource = isTest
		? buildTestProvider(entities)
		: buildProdProvider(
				castType,
				hostname,
				port,
				username,
				password,
				table,
				entities,
			);
	return dataSource.initialize();
}
