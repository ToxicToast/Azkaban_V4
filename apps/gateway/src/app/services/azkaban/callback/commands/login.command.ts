import { LoginDTO } from '../dto';

export class LoginCommand {
	constructor(public readonly dto: LoginDTO) {}
}
