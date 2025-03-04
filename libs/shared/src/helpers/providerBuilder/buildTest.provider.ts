import { DataSource, EntitySchema, MixedList } from 'typeorm';

export function buildTestProvider(
	entities: MixedList<string | EntitySchema>,
): DataSource {
	return new DataSource({
		type: 'sqlite',
		database: ':memory:',
		dropSchema: true,
		synchronize: true,
		logging: false,
		entities,
	});
}
