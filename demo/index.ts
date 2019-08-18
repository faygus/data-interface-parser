import { Parser } from "../src/index";

/*const data = `prop1: string,
prop2: {
	a: boolean,
	b: {
		c: string,
		d: number
	}
}`;*/
const data = `prop1: string
prop2: number
prop3: boolean

prop4: boolean
`;

const parser = new Parser(data, '\n\n');
// parser.setConfiguration(';');
const res = parser.parse();
console.log('res', JSON.stringify(res.token));
