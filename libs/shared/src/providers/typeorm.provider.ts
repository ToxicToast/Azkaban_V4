import { TypeORMHelper } from '../helpers';
import { EntitySchema, MixedList } from 'typeorm';

export const datasourceProvider = (
	environment: string,
	type: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	table: string,
	entities: MixedList<string | EntitySchema>,
) => [
	{
		provide: 'DATA_SOURCE',
		useFactory: () => {
			return TypeORMHelper(
				environment,
				type,
				hostname,
				port,
				username,
				password,
				table,
				entities,
			);
		},
	},
];
