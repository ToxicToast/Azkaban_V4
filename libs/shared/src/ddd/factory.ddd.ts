export interface Factory<Anemic, Domain, Data> {
	reconstitute(data: Anemic): Domain;
	constitute(data: Domain): Anemic;
	createDomain(data: Data): Domain;
}
