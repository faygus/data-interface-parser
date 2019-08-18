import { ParsingResultBuilder, TokenUnit, ICodeParsingResult } from "code-parsing";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation, PrimitiveType } from "./types/interpretation";
import * as Model from "./types/tokens";
import * as Props from "../props/types";

export class Builder extends ParsingResultBuilder<Model.Token, DiagnosticType, Interpretation> {
	private _name: string;
	private _propName: Model.PropNameToken;
	private _typeToken: Model.PropComplexTypeToken | Model.PropPrimitiveTypeToken;

	addPropName(offset: number, name: string): void {
		const tokenUnit = new TokenUnit(name, offset);
		this._propName = new Model.PropNameToken(tokenUnit);
		this._name = name;
	}

	addPropComplexType(offset: number, props: ICodeParsingResult<Props.Token, Props.DiagnosticType, Props.Interpretation>): void {
		const tokenUnit = new TokenUnit(props.text, offset);
		const cxt = new Model.PropTypeCxt(this._name);
		this._typeToken = new Model.PropComplexTypeToken(tokenUnit, cxt, props.token.content);
		this._interpretation = new Interpretation(this._name, props.interpretation.props);
	}

	addPropPrimitiveType(offset: number, typeStr: string): void {
		const tokenUnit = new TokenUnit(typeStr, offset);
		const cxt = new Model.PropTypeCxt(this._name);
		this._typeToken = new Model.PropPrimitiveTypeToken(tokenUnit, cxt);
		let type = primitiveTypesMap[typeStr];
		if (type === undefined) type = typeStr;
		this._interpretation = new Interpretation(this._name, type);
	}

	protected getToken(tokenUnit: TokenUnit): Model.Token {
		const content = new Model.Content(this._propName, this._typeToken);
		return new Model.Token(tokenUnit, content);
	}
}

const primitiveTypesMap = {
	'number': PrimitiveType.NUMBER,
	'string': PrimitiveType.STRING,
	'boolean': PrimitiveType.BOOLEAN,
	'void': PrimitiveType.VOID,
}
