import { Optional, Nullable } from '../types';

export interface Repository<Domain> {
	save(data: Domain): Promise<Domain>;
	findList(
		limit?: Optional<number>,
		offset?: Optional<number>,
		withDeleted?: Optional<boolean>,
	): Promise<Array<Domain>>;
	findById(
		id: number,
		withDeleted?: Optional<boolean>,
	): Promise<Nullable<Domain>>;
}
