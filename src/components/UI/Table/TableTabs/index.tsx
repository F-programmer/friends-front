import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';

import { TabContainer, StyledTab, StyledTabs } from './styles';

interface UITabsProps {
	items: string[];
	current: number;
	children?: JSX.Element | ReactElement;
	onChange?: ((tab: number) => void) | any;
}

export default function TableTabs({
	items = [],
	current,
	children,
	onChange = () => {}
}: UITabsProps) {
	return (
		<>
			<Box zIndex="tooltip">
				<StyledTabs
					value={current}
					variant="fullWidth"
					onChange={(_, newValue) => onChange(newValue)}>
					{items.map((item, index) => (
						<StyledTab label={item} key={`tab${index}`} />
					))}
				</StyledTabs>
			</Box>
			<TabContainer zIndex="modal">{children}</TabContainer>
		</>
	);
}
