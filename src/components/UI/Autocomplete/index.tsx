import React from "react";
import { Autocomplete } from "@material-ui/lab";

import UIInput from "../Input/index";

import { ACItem, UIAutocompleteProps } from "./interfaces";

export default function UIAutocomplete({
	onChange = () => {},
	disabled = false,
	items = [],
	getOptionLabel = (option: ACItem) => option.name,
	...props
}: UIAutocompleteProps) {
	return (
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
	);
}
