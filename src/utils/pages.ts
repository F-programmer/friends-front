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
	let fieldError = formikConfig.errors[fieldName];

	const errorRef = formikConfig.errors[fieldName];
	if (errorRef && typeof errorRef !== "string") {
		const objKeys = Object.keys(errorRef);

		if (objKeys.length > 0) {
			fieldError = errorRef[objKeys[0]];
		}
	}

	return {
		name: fieldName,
		value: formikConfig.values[fieldName],
		error: fieldError && formikConfig.touched[fieldName] ? fieldError : "",
		onBlur: formikConfig.handleBlur,
		onChange: changeProps,
	};
}

export const getOnlyOneError = (errors, name: string): string => {
	let fieldError = errors[name];

	const errorRef = errors[name];
	if (errorRef && typeof errorRef !== "string") {
		const objKeys = Object.keys(errorRef);

		if (objKeys.length > 0) {
			fieldError = errorRef[objKeys[0]];
		}
	}

	return String(fieldError || "");
};
