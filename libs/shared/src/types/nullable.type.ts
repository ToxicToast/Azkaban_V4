import { Either } from './either.type';

export type Nullable<Type> = Either<Type, null>;
