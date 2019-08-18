import { Token as BaseToken, TokenUnit } from "code-parsing";

export class PropNameToken extends BaseToken {
}

export class PropPrimitiveTypeToken extends BaseToken {
	constructor(tokenUnit: TokenUnit, public context: PropTypeCxt) {
		super(tokenUnit);
	}
}

export class PropComplexTypeToken extends BaseToken {
	constructor(tokenUnit: TokenUnit, public context: PropTypeCxt, public content: Token[]) {
		super(tokenUnit);
	}

	protected getContent(): BaseToken[] {
		return [...this.content];
	}
}

// contexts

export class PropTypeCxt {
	constructor(public propName: string) {
	}
}

export class Token extends BaseToken {
	constructor(tokenUnit: TokenUnit, public content: Content) {
		super(tokenUnit);
	}

	protected getContent(): BaseToken[] {
		return [this.content.propName, this.content.type];
	}
}

export class Content {
	constructor(public propName: PropNameToken,
		public type: PropPrimitiveTypeToken | PropComplexTypeToken) {

	}
}
