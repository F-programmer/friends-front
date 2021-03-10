import { MessageProps } from "./interfaces";
import {
	withStyles,
	InputBase,
	InputLabel,
	FormHelperText,
} from "@material-ui/core";

const defaultStyles = (theme) => {
	return {
		root: {
			"label + &": {
				marginTop: theme.spacing(3),
			},
		},
		input: {
			backgroundColor: "var(--fieldColor)",
			fontSize: 16,
			fontFamily: "Poppins",
			padding: ".5rem",
			borderTopRightRadius: "5px",
			borderTopLeftRadius: "5px",
			borderColor: "var(--primary)",
			borderBottom: "3px solid",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			"&:focus": {
				borderColor: "var(--primary)",
				transition: theme.transitions.create([
					"border-color",
					"box-shadow",
				]),
			},
		},
		error: {
			borderLeft: "3px solid var(--error)",
			color: "var(--error)",
		},
	};
};

export const StyledInputBase = withStyles((theme) => ({
	...defaultStyles(theme),
}))(InputBase);

export const StyledInputLabel = withStyles((them) => ({
	root: {
		fontSize: "22px",
		color: "var(--text)",
		fontFamily: "Poppins",
	},
}))(InputLabel);

export const StyledMessage = withStyles({
	root: {
		color: (props: MessageProps) => `var(--${props.messageType || "text"})`,
	},
})(FormHelperText);

export const SearchInput = withStyles((theme) => ({
	...defaultStyles(theme),
	input: {
		backgroundColor: "var(--fieldColor)",
		fontSize: 16,
		fontFamily: "Poppins",
		padding: ".9rem",
		borderBottomLeftRadius: "5px",
		borderTopLeftRadius: "5px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:focus": {
			borderColor: "var(--primary)",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
		},
	},
}))(InputBase);
