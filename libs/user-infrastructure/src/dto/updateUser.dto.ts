import { Optional } from '@azkaban/shared';

export interface UpdateUserDTO {
	email?: Optional<string>;
	username?: Optional<string>;
	password?: Optional<string>;
	salt?: Optional<string>;
}
