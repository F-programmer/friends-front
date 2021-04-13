import React from "react";
import { Grid } from "@material-ui/core";
import UIInput from "../Input";
import UIButton from "../Button";
import { UIInputProps } from "../Input/interfaces";

interface UISearchProps extends UIInputProps {
	onSearch?: () => void;
	btnText: string;
}

function UISearch({ btnText, onSearch = () => {}, ...props }: UISearchProps) {
	return (
		<Grid container>
			<Grid item xs>
				<UIInput variant="search" {...props} />
			</Grid>
			<Grid item xs={2}>
				<UIButton onClick={onSearch}>{btnText}</UIButton>
			</Grid>
		</Grid>
	);
}

export default UISearch;
export { UISearch };
