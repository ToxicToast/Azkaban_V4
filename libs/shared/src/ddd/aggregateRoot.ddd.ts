import { DomainEvent } from './domainEvent.ddd';

export abstract class AggregateRoot<T extends DomainEvent = DomainEvent> {
	private readonly domainEvents: Array<T> = [];

	protected addDomainEvent(event: T): void {
		this.domainEvents.push(event);
	}

	public pullDomainEvents(): Array<T> {
		const events = [...this.domainEvents];
		this.domainEvents.length = 0;
		return events;
	}
}
