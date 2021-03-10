import React from "react";

import { StyledButton } from "./styles";

import { UIButtonProps } from "./interfaces";

export default function UIButton({
	fullWidth = true,
	type = "button",
	onClick = () => {},
	...props
}: UIButtonProps) {
	return (
		<StyledButton
			{...props}
			fullWidth={fullWidth}
			onClick={onClick}
			type={type}
		>
			{props.children}
		</StyledButton>
	);
}
