import { Button, withStyles } from "@material-ui/core";
import { DefaultStylesProps } from "./interfaces";

const defaultStyles: DefaultStylesProps = {
	fontSize: (props) => props.fontSize || "18px",
	padding: (props) => props.padding || ".5rem",
	border: (props) => props.border || "",
	backgroundColor: (props) => props.bgColor || "var(--primary)",
	color: (props) => props.textcolor || "var(--white)",
};

export const StyledButton = withStyles({
	root: {
		...defaultStyles,
		transition: ".3s",
		"&:hover": {
			backgroundColor: "var(--primary)",
			opacity: ".7",
			color: "var(--text)",
		},
	},
})(Button);
