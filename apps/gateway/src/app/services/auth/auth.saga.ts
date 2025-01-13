import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { LoginEvent, RegisterEvent } from './events';
import { NotificationCommand } from './commands';

@Injectable()
export class AuthSaga {
	@Saga()
	loginNotification = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(LoginEvent),
			map((event: LoginEvent) => {
				return new NotificationCommand(
					'login',
					event.id,
					event.username,
				);
			}),
		);
	};

	@Saga()
	registerNotification = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(RegisterEvent),
			map((event: RegisterEvent) => {
				return new NotificationCommand(
					'register',
					event.id,
					event.username,
				);
			}),
		);
	};
}
