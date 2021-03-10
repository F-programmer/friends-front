import { ReactElement } from "react";

export interface UIButtonProps {
	startIcon?: JSX.Element | ReactElement;
	endIcon?: JSX.Element | ReactElement;
	fullWidth?: boolean;
	onClick?: (...evt: any) => void;
	children: JSX.Element | string;
	bgColor?: string;
	padding?: string;
	type?: "button" | "reset" | "submit";
	fontSize?: string;
	border?: string;
	[propName: string]: any;
}

export interface StyledButtonProps {
	fontSize?: string;
	padding?: string;
	bgColor?: string;
	border?: string;
	textcolor?: string;
}

export interface DefaultStylesProps {
	fontSize?: ((props: StyledButtonProps) => string) | string;
	padding?: ((props: StyledButtonProps) => string) | string;
	backgroundColor?: ((props: StyledButtonProps) => string) | string;
	border?: ((props: StyledButtonProps) => string) | string;
	color?: ((props: StyledButtonProps) => string) | string;
}
