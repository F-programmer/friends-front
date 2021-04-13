export interface ACItem {
	name: string;
	value: string | any;
}

export interface UIAutocompleteProps {
	value: ACItem | {};
	name: string;
	items: ACItem[];
	label?: string;
	placeholder?: string;
	onChange?: any;
	disabled?: boolean;
	getOptionLabel?: (option?: ACItem) => any;
	error?: string;
	[propName: string]: any;
}
