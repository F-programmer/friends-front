export interface FormikField {
	name: string;
	value: string;
	onChange: (...evt: any) => void;
	onBlur: (...evt: any) => void;
	error: string;
}

export interface FormikConfig {
	values: any;
	errors: any;
	touched: any;
	handleChange: any;
	handleBlur: any;
	setFieldValue: any;
}
