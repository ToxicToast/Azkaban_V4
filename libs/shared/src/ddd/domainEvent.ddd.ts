export interface DomainEvent {
	readonly occured_at: Date;
	readonly aggregate_id: number;
	readonly event_name: string;
}
