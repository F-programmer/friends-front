import dynamic from "next/dynamic";
const StyledBox = dynamic(() => import("./styles"), { ssr: false });
// utilizando dynamic pq os dados sao inseridos do css, ent nao carregava o overflow

import React, { useState, useEffect } from "react";
import {
	Box,
	Grid,
	TableBody,
	TableHead,
	TableContainer,
	TableRow,
	TableCell,
	Table,
} from "@material-ui/core";

import { StyledTableCell, StyledTableRow } from "./styles";

import { UITableProps, TableSetup, UITableRow } from "./interfaces";

import { fakeRows } from "utils/fake";

export default function UITable({ data, bordered = false }: UITableProps) {
	const [tableSetup, setTableSetup] = useState<TableSetup>({
		allRows: [],
		header: { row: [] },
		names: {},
		totalRows: 1, //Math.ceil(tableSetup.allRows.length / parseInt(tableSetup.byPage))
	});

	const byPage = 50;

	useEffect(() => {
		let workWith: UITableRow[];

		if (data && data !== undefined && data !== null && data.length > 0)
			workWith = data;
		else
			workWith = fakeRows(1000, [{ type: "string" }, { type: "integer" }], {
				row: [
					{ children: "Doces", disponibility: true, name: "candys" },
					{
						children: "Quantidade",
						disponibility: true,
						name: "quantities",
					},
				],
				header: true,
			});

		// pegando o cabecalho
		const header: UITableRow = workWith.filter(
			(item) => item.header === true
		)[0];
		// e os names para filtrar
		const names = {};
		header.row.forEach((item, index) => (names[item.name] = index));
		// removendo os cabecalhos das demais linhas
		workWith.splice(workWith.indexOf(header), 1);
		// allRows = todas as linhas possiveis
		let totalRows = workWith.length / byPage;
		if (parseInt(totalRows.toFixed(0)) < totalRows) totalRows += 1;
		setTableSetup({
			allRows: workWith,
			header,
			names,
			totalRows: parseInt(totalRows.toFixed(0)),
		});
	}, [data]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<StyledBox border={bordered ? "1px solid var(--grey)" : "none"}>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{tableSetup.header.row.map(({ ...item }, index) => (
										<TableCell key={index}>{item.children}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{tableSetup.allRows.map((item, index) => (
									<StyledTableRow key={index}>
										{item.row.map((cell, cellIndex) => (
											<StyledTableCell
												key={cellIndex}
												align="center"
												scope="row"
											>
												{cell.children}
											</StyledTableCell>
										))}
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</StyledBox>
			</Grid>
		</Grid>
	);
}
