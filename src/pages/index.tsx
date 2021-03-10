import React from "react";
import {
	Grid,
	Paper,
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from "@material-ui/core";

import UIText from "components/UI/Text";

import { GiPlainCircle } from "react-icons/gi";

export default function Home() {
	return (
		<Box p={3}>
			<Paper>
				<Box p={3}>
					<Grid container>
						<Grid item xs={12}>
							<UIText size="25px" textcolor="var(--primary)">
								Bem vind@ ao Friends!!!
							</UIText>
						</Grid>
						<Grid item xs={12}>
							<UIText size="15px">
								Primeiramente dizemos que não temos nenhuma ligação com
								o seriado friends, isso não eh um publi, mas podeira ser
								né...
							</UIText>
						</Grid>
						<Grid item xs={12}>
							<Box mt={2}>
								<Grid container>
									<Grid item xs={12}>
										<UIText size="20px" textcolor="var(--primary)">
											Tecnologias utilizadas:
										</UIText>
									</Grid>
									<Grid item xs={12}>
										<List>
											{tech.map((item, index) => (
												<ListItem key={index}>
													<ListItemIcon>
														<GiPlainCircle
															size={15}
															color="var(--primary)"
														/>
													</ListItemIcon>
													<ListItemText>{item}</ListItemText>
												</ListItem>
											))}
										</List>
									</Grid>
								</Grid>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
}

const tech = [
	"Javascript",
	"Typescript (coisa linda de Deus)",
	"PHP",
	"MySql",
	"Material-UI",
	"Formik",
	"Yup",
	"Axios (Faz as requisições ajax)",
	"Styled-Components",
	"React Js",
	"Next Js (meu xodó)",
];
