import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ListEvent } from '../events';
import { CacheCommand } from '../commands';

@Injectable()
export class CacheSaga {
	@Saga()
	cacheList = (events$: Observable<ListEvent>): Observable<ICommand> => {
		return events$.pipe(
			ofType(ListEvent),
			map((event) => new CacheCommand('azkaban:users:list', event.data)),
		);
	};
}
