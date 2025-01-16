export class NotificationCommand {
	constructor(
		public readonly type: 'login' | 'register',
		public readonly id: string,
		public readonly username: string,
	) {}
}
