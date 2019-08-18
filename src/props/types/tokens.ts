import { Token as BaseToken, TokenUnit } from "code-parsing";
import { Token as PropToken } from "../../prop/types/tokens";

export class Token extends BaseToken {
	constructor(tokenUnit: TokenUnit, public content: PropToken[]) {
		super(tokenUnit);
	}

	protected getContent(): BaseToken[] {
		return [...this.content]
	}
}
