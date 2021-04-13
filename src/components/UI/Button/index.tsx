import React from "react";

import { StyledButton } from "./styles";

import { UIButtonProps } from "./interfaces";

function UIButton({
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

export default UIButton;
export { UIButton };
