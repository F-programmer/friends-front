import React, { ReactElement, useEffect, useState } from 'react';
import { TableSortLabel } from '@material-ui/core';

import { StyledTableCell } from '../styles';
import { ChangesButtonParams } from '../interfaces';

interface TableHeaderProps {
	onButtonChanges?: (configs: ChangesButtonParams) => void;
	children: JSX.Element | ReactElement | string;
	name: string;
	disponibility?: boolean;
}

export default function TableHeader({
	onButtonChanges,
	children,
	name,
	disponibility = false
}: TableHeaderProps) {
	const [btnState, setBtnState] = useState<'disabled' | 'top' | 'down'>('disabled');

	const handleClick = () => {
		if (!onButtonChanges) return;
		if (btnState === 'disabled') return setBtnState('top');
		if (btnState === 'top') return setBtnState('down');
		if (btnState === 'down') return setBtnState('disabled');
	};

	useEffect(() => setBtnState('disabled'), [disponibility]);
	// escalar para multiplos botoes
	useEffect(
		() =>
			onButtonChanges({
				name,
				state: btnState
			}),
		[btnState]
	);

	return (
		<StyledTableCell align="center" width="100%">
			{onButtonChanges && disponibility ? (
				<TableSortLabel
					active={onButtonChanges && btnState !== 'disabled' ? true : false}
					direction={{ top: 'asc', down: 'desc' }[btnState]}
					onClick={handleClick}>
					{children}
				</TableSortLabel>
			) : (
				children
			)}
		</StyledTableCell>
	);
}
