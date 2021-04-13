import React from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import UIInput from "../Input/index";

import { ACItem, UIAutocompleteProps } from "./interfaces";

function UIAutocomplete({
	onChange = () => {},
	disabled = false,
	items = [],
	getOptionLabel = (option: ACItem) => option.name,
	error,
	...props
}: UIAutocompleteProps) {
	return (
		<FormControl error={error ? true : false} fullWidth>
			<Autocomplete
				options={items}
				getOptionLabel={getOptionLabel}
				renderInput={(params) => (
					<div ref={params.InputProps.ref}>
						<UIInput
							component="InputBlank"
							disabled={disabled}
							{...params}
							{...props}
							endIcon={params.InputProps.endAdornment}
							inputRef={params.InputProps.ref}
						/>
					</div>
				)}
				onChange={(_, newValue: string) =>
					onChange({
						target: {
							name: props.name,
							value: newValue,
						},
					})
				}
				{...props}
			/>
			<FormHelperText>{error}</FormHelperText>
		</FormControl>
	);
}

export default UIAutocomplete;
export { UIAutocomplete };
