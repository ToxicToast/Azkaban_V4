export interface Mapper<Domain, Entity> {
	toEntity(data: Domain): Entity;
	toDomain(data: Entity): Domain;
}
