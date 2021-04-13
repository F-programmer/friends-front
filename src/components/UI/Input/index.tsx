import React from "react";
import { FormControl, InputAdornment, FormHelperText } from "@material-ui/core";

import {
	StyledInputBase,
	StyledInputLabel,
	StyledMessage,
	SearchInput,
} from "./styles";

import { UIInputProps } from "./interfaces";

function UIInput({
	fullWidth = true,
	type = "text",
	onChange = () => {},
	variant = "normal",
	...props
}: UIInputProps) {
	const startAdornment = props.startIcon ? (
		<InputAdornment position="start">{props.startIcon}</InputAdornment>
	) : (
		""
	);

	const endAdornment = props.endIcon ? (
		<InputAdornment position="end">{props.endIcon}</InputAdornment>
	) : (
		""
	);

	console.log(props.error);

	return (
		<FormControl error={props.error ? true : false} fullWidth={fullWidth}>
			{props.label ? (
				<StyledInputLabel shrink>{props.label}</StyledInputLabel>
			) : (
				""
			)}
			{variant === "normal" ? (
				<StyledInputBase
					{...props}
					error={props.error ? true : false}
					type={type}
					onChange={onChange}
				/>
			) : (
				<SearchInput
					{...props}
					error={props.error ? true : false}
					type={type}
					onChange={onChange}
				/>
			)}
			<FormHelperText>{props.error}</FormHelperText>
		</FormControl>
	);
}
export default UIInput;
export { UIInput };
