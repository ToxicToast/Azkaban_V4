import { EntitySchema, MixedList } from 'typeorm';
import { datasourceProvider as baseProvider } from '@azkaban/shared';

export const datasourceProvider = (
	environment: string,
	type: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	table: string,
	entities: unknown,
) =>
	baseProvider(
		environment,
		type,
		hostname,
		port,
		username,
		password,
		table,
		entities as MixedList<string | EntitySchema>,
	);
