import { DataSource, EntitySchema, MixedList } from 'typeorm';

export function buildProdProvider(
	type: 'postgres' | 'mariadb',
	hostname: string,
	port: number,
	username: string,
	password: string,
	database: string,
	entities: MixedList<string | EntitySchema>,
): DataSource {
	return new DataSource({
		type,
		host: hostname,
		port,
		username,
		password,
		database,
		synchronize: true,
		logging: false,
		entities,
	});
}
