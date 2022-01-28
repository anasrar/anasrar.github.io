import React from "react";
import styled from "@emotion/styled";

interface Props {
	element?: string;

	flexFlow?: string;
	justifyContent?: string;
	alignItems?: string;
	alignContent?: string;
	gap?: string;
	overflow?: string;

	margin?: string;
	padding?: string;
	minWidth?: string;
	maxWidth?: string;
	minHeight?: string;
	maxHeight?: string;
}

interface StyledProps {
	styled: Props;
}

const Flex: React.FC<Props> = ({ element, children, ...other }) => {
	const Element = styled[element]<StyledProps>`
		display: flex;
		flex-flow: ${(props: StyledProps) => props.styled.flexFlow};
		justify-content: ${(props: StyledProps) => props.styled.justifyContent};
		align-items: ${(props: StyledProps) => props.styled.alignItems};
		align-content: ${(props: StyledProps) => props.styled.alignContent};
		gap: ${(props: StyledProps) => props.styled.gap};
		overflow: ${(props: StyledProps) => props.styled.overflow};

		margin: ${(props: StyledProps) => props.styled.margin};
		padding: ${(props: StyledProps) => props.styled.padding};
		min-width: ${(props: StyledProps) => props.styled.minWidth};
		max-width: ${(props: StyledProps) => props.styled.maxWidth};
		min-height: ${(props: StyledProps) => props.styled.minHeight};
		max-height: ${(props: StyledProps) => props.styled.maxHeight};
	`;

	return <Element styled={other}>{children}</Element>;
};

Flex.defaultProps = {
	element: `section`,

	flexFlow: `row nowrap`,
	justifyContent: `flex-start`,
	alignItems: `stretch`,
	alignContent: `normal`,
	gap: `0`,
	overflow: `visible`,

	margin: `0`,
	padding: `0`,
	minWidth: `0`,
	maxWidth: `none`,
	minHeight: `0`,
	maxHeight: `none`,
};

export default Flex;
