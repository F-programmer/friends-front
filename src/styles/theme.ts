import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#00c652",
			light: "#5efa81",
			dark: "#009423",
		},
		success: {
			main: "#009944",
		},
		error: {
			main: "#c9000f",
		},
		secondary: {
			main: "#e1e2e1",
		},
		text: {
			primary: "#565656",
			secondary: "#fff",
			disabled: "#e1e2e1",
		},
		info: {
			main: "#2196f3",
			light: "#64b5f6",
			dark: "#1976d2",
		},
		common: {
			black: "#000",
			white: "#fff",
		},
	},
});

export default theme;
