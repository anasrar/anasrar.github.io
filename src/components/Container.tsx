import React from "react";
import styled from "@emotion/styled";

interface Props {
	element?: string;
	display?: string;
	margin?: string;
	padding?: string;
	minWidth?: string;
	maxWidth?: string;
	minHeight?: string;
	maxHeight?: string;
	overflow?: string;

	color?: string;
	textAlign?: string;

	mixBlendMode?: string;
}

interface StyledProps {
	styled: Props;
}

const Container: React.FC<Props> = ({ element, children, ...other }) => {
	const Element = styled[element]<StyledProps>`
		display: ${(props: StyledProps) => props.styled.display};
		margin: ${(props: StyledProps) => props.styled.margin};
		padding: ${(props: StyledProps) => props.styled.padding};
		min-width: ${(props: StyledProps) => props.styled.minWidth};
		max-width: ${(props: StyledProps) => props.styled.maxWidth};
		min-height: ${(props: StyledProps) => props.styled.minHeight};
		max-height: ${(props: StyledProps) => props.styled.maxHeight};
		overflow: ${(props: StyledProps) => props.styled.overflow};

		color: ${(props: StyledProps) => props.styled.color};
		text-align: ${(props: StyledProps) => props.styled.textAlign};

		mix-blend-mode: ${(props: StyledProps) => props.styled.mixBlendMode};
	`;

	return <Element styled={other}>{children}</Element>;
};

Container.defaultProps = {
	element: `section`,
	display: `block`,
	margin: `0`,
	padding: `0`,
	minWidth: `0`,
	maxWidth: `none`,
	minHeight: `0`,
	maxHeight: `none`,
	overflow: `visible`,

	color: `inherit`,
	textAlign: `left`,

	mixBlendMode: `normal`,
};

export default Container;
