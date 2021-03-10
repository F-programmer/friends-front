export interface UITableCell {
	name?: string;
	children: any;
	disponibility?: boolean;
}
export interface UITableRow {
	row: UITableCell[];
	header?: boolean;
}
export interface UITableProps {
	data?: UITableRow[];
	bordered?: boolean;
}
export interface ChangesButtonParams {
	name: string;
	state: "disabled" | "top" | "down";
}

export interface TableSetup {
	header: UITableRow | { row: [] };
	names: any;
	allRows: UITableRow[] | [];
	totalRows: number;
}
