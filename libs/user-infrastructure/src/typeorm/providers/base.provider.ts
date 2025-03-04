import { EntitySchema, MixedList } from 'typeorm';
import { datasourceProvider as baseProvider } from '@azkaban/shared';
import { UserEntity } from '../entities';

export const datasourceProvider = (
	environment: string,
	type: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	table: string,
) =>
	baseProvider(environment, type, hostname, port, username, password, table, [
		UserEntity,
	] as unknown as MixedList<string | EntitySchema>);
