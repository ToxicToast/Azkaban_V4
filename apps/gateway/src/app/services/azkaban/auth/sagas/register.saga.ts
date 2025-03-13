import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { RegisterEvent } from '../events';
import { SSECommand, WelcomeCommand } from '../commands';
import { AzkabanSSETopics } from '@azkaban/shared';

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

	@Saga()
	sendToSSE = (events$: Observable<RegisterEvent>): Observable<ICommand> => {
		return events$.pipe(
			ofType(RegisterEvent),
			map(
				(event) =>
					new SSECommand(AzkabanSSETopics.REGISTER, event.username),
			),
		);
	};
}
