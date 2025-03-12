import { TypeORMHelper } from '../helpers';
import { DataSource, EntitySchema, MixedList } from 'typeorm';

export const datasourceProvider = (
	environment: string,
	type: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	table: string,
	entities: MixedList<string | EntitySchema>,
): Array<{ provide: string; useFactory: () => Promise<DataSource> }> => [
	{
		provide: 'DATA_SOURCE',
		useFactory: () => {
			const helper = TypeORMHelper(
				environment,
				type,
				hostname,
				port,
				username,
				password,
				table,
				entities,
			);
			return helper;
		},
	},
];
