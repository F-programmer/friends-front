import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import UIText from "components/UI/Text";

import { useFormik } from "formik";
import UITable from "components/UI/Table";
import UISearch from "../../components/UI/Search/index";
import { GenerateFormikField } from "utils/pages";
import { UITableRow } from "../../components/UI/Table/interfaces";
import api from "api/index";

export default function Friends() {
	const headerTable: UITableRow[] = [
		{
			row: [
				{ children: "ID" },
				{ children: "Nome" },
				{ children: "Data de nascimento" },
				{ children: "Cor favorita" },
			],
			header: true,
		},
	];

	const [data, setData] = useState<UITableRow[]>(headerTable);
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
	} = useFormik({
		initialValues: { search: "" },
		onSubmit: () => {},
	});

	const formikConfig = {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
	};

	useEffect(() => {
		const getData = async () => {
			const myHeader: UITableRow[] = [
				{
					row: [
						{ children: "ID" },
						{ children: "Nome" },
						{ children: "Data de nascimento" },
						{ children: "Cor favorita" },
					],
					header: true,
				},
			];

			try {
				console.log(myHeader);
				const result = values.search
					? await api.get("friends/get.php", {
							params: {
								search: values.search,
							},
					  })
					: await api.get("friends/get.php");
				const data = await result.data;

				const names = ["id", "name", "birth_date"];

				const items = data.map((item) => {
					const cells = names.map((name) => ({ children: item[name] }));
					return {
						row: cells.concat({
							children: (
								<Grid container>
									<Grid item xs>
										{item["name_color"]}
									</Grid>
									<Grid item xs={1}>
										<Box
											bgcolor={item["code"]}
											width="15px"
											height="15px"
											borderRadius="50px"
										/>
									</Grid>
								</Grid>
							),
						}),
					};
				});

				setData(myHeader.concat(items));
			} catch (err) {
				return null;
			}
		};

		getData();
	}, [values.search]);

	return (
		<Box p={2}>
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={0}>
						<Box p={2}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<UIText size="25px">Amigos cadastrados</UIText>
								</Grid>
								<Grid item xs={12}>
									<UISearch
										btnText="Limpar"
										{...GenerateFormikField("search", formikConfig)}
										onSearch={() => setFieldValue("search", "")}
									/>
								</Grid>
								<Grid item xs={12}>
									<UITable data={data} />
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
