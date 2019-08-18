import { BaseCodeParser } from "code-parsing";
import { DiagnosticType } from "./types/diagnostic-type";
import { Interpretation } from "./types/interpretation";
import { Token } from "./types/tokens";
import { Parser as PropParser } from "../prop/parser";
import { Builder } from "./builder";

/*
Exemple de parsing :
prop1: string,
prop2: {
	a: boolean
}
*/
export class Parser extends BaseCodeParser<Token,
	DiagnosticType,
	Interpretation,
	Builder> {

	private _separator: string = undefined;

	protected getBuilder(): Builder {
		return new Builder();
	}

	setConfiguration(separatorCharacter: string): void {
		this._separator = separatorCharacter;
	}

	protected buildResult(): void {
		this.parseProp();
	}

	private parseProp(): void {
		const propParser = new PropParser(this._stringParser.nextString, this._separator);
		const parsingResult = propParser.parse();
		this._parsingResultBuilder.addProp(this._stringParser.offset, parsingResult);
		this._stringParser.next(propParser.offset);
		if (this._stringParser.currentChar === this._separator) {
			this._stringParser.next();
		}
		if (!this._stringParser.navigateToFirstNonEmptyCharExcept(this._endingCharacter)) {
			return;
		}
		this.nextOperation(this.parseProp);
	}
}
