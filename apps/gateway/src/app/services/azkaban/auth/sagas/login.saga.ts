import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { LoginEvent } from '../events';
import { SSECommand, UpdateLoginCommand } from '../commands';
import { AzkabanSSETopics } from '@azkaban/shared';

@Injectable()
export class LoginSaga {
	@Saga()
	updateLogin = (events$: Observable<LoginEvent>): Observable<ICommand> => {
		return events$.pipe(
			ofType(LoginEvent),
			map((event) => new UpdateLoginCommand(event.id, new Date())),
		);
	};

	@Saga()
	sendToSSE = (events$: Observable<LoginEvent>): Observable<ICommand> => {
		return events$.pipe(
			ofType(LoginEvent),
			map(
				(event) =>
					new SSECommand(
						AzkabanSSETopics.LOGIN,
						event.id,
						event.username,
					),
			),
		);
	};
}
