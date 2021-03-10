import { Typography, withStyles } from "@material-ui/core";

export interface FuncProps {
	size?: string;
	fontWeight?: number;
	cursor?: string;
	textcolor?: string;
	[propName: string]: any;
}

const defaultStyles = {
	fontSize: (props: FuncProps) => props.size,
	fontWeight: (props: FuncProps) => props.fontWeight,
	cursor: (props: FuncProps) => props.cursor,
	color: (props: FuncProps) => props.textcolor,
};

export const StyledTypography = withStyles({
	root: {
		...defaultStyles,
	},
})(Typography);
