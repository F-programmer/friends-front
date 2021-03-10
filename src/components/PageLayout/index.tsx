import React, { ReactElement } from "react";
import { Container, Grid } from "@material-ui/core";

interface PageLayoutProps {
	children?: JSX.Element | ReactElement;
}

export default function PageLayout({ children }: PageLayoutProps) {
	return (
		<Grid container>
			<Grid item xs={12}>
				{children}
			</Grid>
		</Grid>
	);
}
