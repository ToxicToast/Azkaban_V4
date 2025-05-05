export interface DomainEvent {
	readonly occured_at: Date;
	readonly aggregate_id: string;
	readonly event_name: string;
}
