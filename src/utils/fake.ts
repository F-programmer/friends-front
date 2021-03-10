import { UITableRow, UITableCell } from "components/UI/Table/interfaces";
interface ModelType {
	type: "string" | "integer" | "double" | "component";
	value?: any;
}

const dataTemplates = {
	string: [
		"Ice cream sandwich",
		"Eclair",
		"Cupcake",
		"Kitkat",
		"Jellybeam",
		"Candy",
		"Chocolate",
		"Lolipop",
		"Alfajor",
		"Cotton Candy",
		"Sweet Corn",
		"Jelly",
		"Gum",
		"Gummy Bear",
		"M & M's",
	],
	integer: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
	double: [
		0.1,
		54.63,
		32.24,
		200,
		2.0,
		24.2434324,
		24.245,
		453.21,
		0.86,
		45.63,
		2352.6,
		353.3522,
	],
};

const getRandom = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

export const fakeRows = (n: number, model: ModelType[], concatThis: any) => {
	let myData;
	if (concatThis) myData = [concatThis];
	else myData = [];
	for (let i = 0; i < n; i++) {
		// register number
		const row = [];
		for (let j = 0; j < model.length; j++) {
			// model number
			let cell: UITableCell;
			const { type } = model[j];
			if (type === "component") {
				cell = { children: model[j].value };
			} else {
				const scope = dataTemplates[type];
				cell = { children: scope[getRandom(0, scope.length)] };
			}
			row.push(cell);
		}
		myData.push({ row });
	}
	return myData;
};
