import React from "react";

import { StyledTypography, FuncProps } from "./styles";

interface UITextProps extends FuncProps {
	children?: JSX.Element | any;
	textcolor?: string;
	fontWeight?: number;
	size?: string;
	cursor?: string;
}

function UIText({
	children,
	textcolor = "var(--text)",
	size = "14px",
	fontWeight = 400,
	cursor = "normal",
}: UITextProps) {
	return (
		<StyledTypography
			textcolor={textcolor}
			size={size}
			fontWeight={fontWeight}
			cursor={cursor}
		>
			{children}
		</StyledTypography>
	);
}
export default UIText;
export { UIText };
