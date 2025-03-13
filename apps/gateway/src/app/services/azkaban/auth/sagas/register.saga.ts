import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { RegisterEvent } from '../events';
import { WelcomeCommand } from '../commands';

@Injectable()
export class RegisterSaga {
	@Saga()
	welcomeEmail = (
		events$: Observable<RegisterEvent>,
	): Observable<ICommand> => {
		return events$.pipe(
			ofType(RegisterEvent),
			map((event) => new WelcomeCommand(event.email, event.username)),
		);
	};
}
