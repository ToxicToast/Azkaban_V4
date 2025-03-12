import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { LoginEvent } from '../events';
import { UpdateLoginCommand } from '../commands';

@Injectable()
export class LoginSaga {
	@Saga()
	updateLogin = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(LoginEvent),
			map((event) => new UpdateLoginCommand(event.id, new Date())),
		);
	};
}
