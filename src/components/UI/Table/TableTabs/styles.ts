import { Box, Tab, Tabs, withStyles } from '@material-ui/core';

export const TabContainer = withStyles({
	root: {
		border: '1px solid #a4b7c1',
		borderTop: 'none',
		padding: '1rem',
		marginTop: '2px',
		position: 'relative'
	}
})(Box);

export const StyledTab = withStyles({
	root: {
		borderBottom: '1px solid #a4b7c1'
	},
	selected: {
		border: '1px solid #a4b7c1'
	}
})(Tab);

export const StyledTabs = withStyles({
	root: {
		marginBottom: '-3px'
	},
	indicator: {
		backgroundColor: '#fff'
	}
})(Tabs);
