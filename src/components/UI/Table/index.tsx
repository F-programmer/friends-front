import dynamic from "next/dynamic";
const StyledBox = dynamic(() => import("./styles"), { ssr: false });
// utilizando dynamic pq os dados sao inseridos do css, ent nao carregava o overflow

import React, { useState, useEffect } from "react";
import {
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

function UITable({ data, bordered = false, header }: UITableProps) {
	const [tableSetup, setTableSetup] = useState<TableSetup>({
		allRows: [],
		names: {},
		totalRows: 1,
	});

	const byPage = 50;

	useEffect(() => {
		if (data && data !== undefined && data !== null && data.length > 0) {
			let workWith: UITableRow[] = data;
			// e os names para filtrar
			const names = {};
			header.row.forEach((item, index) => (names[item.name] = index));
			// allRows = todas as linhas possiveis
			let totalRows = workWith.length / byPage;
			if (parseInt(totalRows.toFixed(0)) < totalRows) totalRows += 1;
			setTableSetup({
				allRows: workWith,
				names,
				totalRows: parseInt(totalRows.toFixed(0)),
			});
		}
	}, [data]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<StyledBox border={bordered ? "1px solid var(--grey)" : "none"}>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									{header.row.map(({ ...item }, index) => (
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

export default UITable;
export { UITable };
export * from "./interfaces";
