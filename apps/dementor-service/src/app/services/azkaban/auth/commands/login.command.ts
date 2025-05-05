export class LoginCommand {
	constructor(public readonly data: { username: string; password: string }) {}
}
