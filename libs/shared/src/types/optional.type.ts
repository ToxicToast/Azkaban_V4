import { Either } from './either.type';

export type Optional<Type> = Either<Type, undefined>;
