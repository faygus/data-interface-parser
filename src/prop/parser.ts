import { BaseCodeParser, whiteSpaceCharacters } from "code-parsing";
import { Builder } from "./builder";
import { DiagnosticType } from "../prop/types/diagnostic-type";
import { Interpretation } from "../prop/types/interpretation";
import { Token } from "../prop/types/tokens";
import { Parser as PropsParser } from "../props/parser";

/*
Exemple de parsing :
prop2: {
	a: boolean
}
*/
export class Parser extends BaseCodeParser<Token,
	DiagnosticType,
	Interpretation,
	Builder> {

	protected getBuilder(): Builder {
		return new Builder();
	}

	protected buildResult(): void {
		this._stringParser.navigateToFirstNonEmptyChar();
		const infos = this._stringParser.navigateUntil([':', ...whiteSpaceCharacters]);
		this._parsingResultBuilder.addPropName(infos.range.start, infos.text);
		if (infos.stopPattern !== ':') {
			this._stringParser.navigateUntil(':');
		}
		this._stringParser.navigateToFirstNonEmptyChar();
		this.nextOperation(this.parsePropType);
	}

	private parsePropType(): void {
		if (this._stringParser.currentChar === '{') {
			this._stringParser.next();
			const parser = new PropsParser(this._stringParser.nextString, '}');
			const parsingResult = parser.parse();
			this._parsingResultBuilder.addPropComplexType(this._stringParser.offset, parsingResult);
			this._stringParser.next(parser.offset);
		} else {
			const infos = this._stringParser.navigateUntil([this._endingCharacter, ...whiteSpaceCharacters]);
			this._parsingResultBuilder.addPropPrimitiveType(infos.range.start, infos.text);
			if (infos.stopPattern) this._stringParser.previous();
		}
	}
}
