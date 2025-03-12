import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { LoginEvent, RegisterEvent } from '../events';
import { UpdateLoginCommand, WelcomeCommand } from '../commands';

@Injectable()
export class RegisterSaga {
	@Saga()
	welcomeEmail = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(RegisterEvent),
			map((event) => new WelcomeCommand(event.email, event.username)),
		);
	};

	@Saga()
	updateLogin = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(LoginEvent),
			map((event) => new UpdateLoginCommand(event.id, new Date())),
		);
	};
}
