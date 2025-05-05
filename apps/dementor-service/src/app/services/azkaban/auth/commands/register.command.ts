export class RegisterCommand {
	constructor(public readonly data: { username: string; password: string }) {}
}
