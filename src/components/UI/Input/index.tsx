import React from "react";
import { FormControl, InputAdornment } from "@material-ui/core";

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
			<StyledMessage messageType={props.error ? "error" : props.messageType}>
				{props.error
					? props.error
					: props.success
					? props.success
					: props.message}
			</StyledMessage>
		</FormControl>
	);
}
export default UIInput;
