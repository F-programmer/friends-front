import { ReactElement } from "react";
export interface MessageStyles {
	messageType: string;
}

export interface MessageProps {
	messageType?: ((props: MessageStyles) => string) | string;
}

export interface UIInputProps {
	name: string;
	value: string | number | any;
	type?: string;
	label?: string | null;
	startIcon?: JSX.Element | ReactElement | any;
	endIcon?: JSX.Element | ReactElement | any;
	error?: string | null;
	success?: string | null;
	fullWidth?: boolean;
	onChange?: (...evt: any) => void;
	messageType?: string;
	message?: string;
	variant?: "normal" | "search";
	[propName: string]: any;
}
