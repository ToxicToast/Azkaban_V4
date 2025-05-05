import { Optional, Nullable } from '../types';

export interface Repository<Domain> {
	save(data: Domain): Promise<Domain>;
	findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<Domain>>;
	findById(id: number): Promise<Nullable<Domain>>;
}
