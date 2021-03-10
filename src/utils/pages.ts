import { FormikField, FormikConfig } from "./interfaces";

export function GenerateFormikField(
	fieldName: string,
	formikConfig: FormikConfig,
	use: "handleChange" | "setFieldValue" = "handleChange"
): FormikField {
	let changeProps;
	switch (use) {
		case "setFieldValue":
			changeProps = (value: any) => {
				formikConfig.setFieldValue(fieldName, value);
			};
		default:
			changeProps = formikConfig.handleChange;
	}
	return {
		name: fieldName,
		value: formikConfig.values[fieldName],
		error: formikConfig.errors[fieldName] && formikConfig.touched[fieldName],
		onBlur: formikConfig.handleBlur,
		onChange: changeProps,
	};
}
