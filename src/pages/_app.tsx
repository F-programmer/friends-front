import React, { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "styles/theme";
import "styles/globals.css";

import Navbar from "components/Navigation/Navbar";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		// remove ss injected css
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Friends WebApplication</title>
				<meta
					name="viewport"
					content="minimun-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Navbar>
					<Component {...pageProps} />
				</Navbar>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
