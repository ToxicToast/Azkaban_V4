export interface Factory<Anemic, Domain, Data, Aggregate> {
	reconstitute(anemic: Anemic): Aggregate;
	constitute(domain: Domain): Anemic;
	createDomain(data: Data): Aggregate;
}
