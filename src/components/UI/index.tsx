import React from "react";
import { StyledInputBase } from "./Input/styles";

interface UIComponentsProps {
	component: "InputBlank";
	[propName: string]: any;
}

export default function UIComponents({
	...props
}: UIComponentsProps): JSX.Element {
	switch (props.component) {
		case "InputBlank":
			return <StyledInputBase />;
		default:
			return <></>;
	}
}
