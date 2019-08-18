export class Interpretation {
	constructor(
		public name: string,
		public type: Type
	) {

	}
}

type TypeSymbole = string;

export type Type = PrimitiveType | TypeSymbole | Interpretation[];

export enum PrimitiveType {
	NUMBER,
	STRING,
	BOOLEAN,
	VOID
}
