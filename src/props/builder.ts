import { ParsingResultBuilder, ICodeParsingResult, TokenUnit } from "code-parsing";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation } from "./types/interpretation";
import * as Model from "./types/tokens";
import * as Prop from "../prop/types";

export class Builder extends ParsingResultBuilder<Model.Token, DiagnosticType, Interpretation> {

	private _props: Prop.Token[] = [];

	constructor() {
		super();
		this._interpretation = new Interpretation();
	}

	addProp(offset: number, prop: ICodeParsingResult<
		Prop.Token, Prop.DiagnosticType, Prop.Interpretation>): void {
		this._interpretation.props.push(prop.interpretation);
		this._props.push(prop.token);
		const tokenUnit = new TokenUnit(prop.text, offset);
	}

	protected getToken(tokenUnit: TokenUnit): Model.Token {
		return new Model.Token(tokenUnit, this._props);
	}
}
