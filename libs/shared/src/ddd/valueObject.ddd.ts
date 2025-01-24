export interface ValueObject<PrimitiveType> {
	readonly _value: PrimitiveType;
	get value(): PrimitiveType;
	equals(valueObject: ValueObject<PrimitiveType>): boolean;
}
