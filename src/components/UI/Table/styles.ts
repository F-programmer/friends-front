import styled from "styled-components";
import {
	Box,
	withStyles,
	createStyles,
	Theme,
	TableRow,
	TableCell,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

export const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: "var(--white)",
			color: "var(--black)",
			borderBottom: "1px solid #777",
			padding: "none",
			fontSize: "16px",
		},
	})
)(TableCell);

export const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: "#00000011",
		},
		"&:hover": {
			background: "var(--p-light)",
		},
	},
}))(TableRow);

export const StyledPagination = withStyles({
	ul: {
		"& li": {
			"& button": {
				backgroundColor: "none",
				color: "var(--primary)",
				borderRadius: "0",
				"&.Mui-selected": {
					backgroundColor: "var(--primary)",
					color: "var(--white)",
				},
				"&.Mui-disabled": {
					backgroundColor: "var(--text-grey)",
					color: "var(--white)",
				},
			},
		},
	},
})(Pagination);

const StyledBox: React.ComponentType<{ border: string }> = styled(Box)`
	height: 400px;
	max-height: 400px;
	min-height: 400px;
	margin-top: 1rem;
	overflow-y: scroll;
	overflow-x: hidden;
	::-webkit-scrollbar {
		width: 7px;
	}
	::-webkit-scrollbar-track {
		border-radius: 3px;
	}
	::-webkit-scrollbar-thumb {
		background: var(--grey);
		border-radius: 3px;
	}
`;

export default StyledBox;
