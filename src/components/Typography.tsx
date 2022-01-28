import React from "react";
import styled from "@emotion/styled";

interface Props {
	element?: string;
	display?: string;
	margin?: string;
	padding?: string;
	overflow?: string;

	color?: string;

	fontFamily?: string;
	fontWeight?: string;
	fontSize?: string;
	fontFeatureSettings?: string;
	fontVariationSettings?: string;

	lineHeight?: string;

	textAlign?: string;
	textTransform?: string;
	textDecoration?: string;
}

interface StyledProps {
	styled: Props;
}

const Typography: React.FC<Props> = ({ element, children, ...other }) => {
	const Element = styled[element]<StyledProps>`
		display: ${(props: StyledProps) => props.styled.display};
		margin: ${(props: StyledProps) => props.styled.margin};
		padding: ${(props: StyledProps) => props.styled.padding};
		overflow: ${(props: StyledProps) => props.styled.overflow};

		color: ${(props: StyledProps) => props.styled.color};

		font-family: ${(props: StyledProps) => props.styled.fontFamily};
		font-weight: ${(props: StyledProps) => props.styled.fontWeight};
		font-size: ${(props: StyledProps) => props.styled.fontSize};
		font-feature-settings: ${(props: StyledProps) =>
			props.styled.fontFeatureSettings};
		font-variation-settings: ${(props: StyledProps) =>
			props.styled.fontVariationSettings};

		line-height: ${(props: StyledProps) => props.styled.lineHeight};

		text-align: ${(props: StyledProps) => props.styled.textAlign};
		text-transform: ${(props: StyledProps) => props.styled.textTransform};
		text-decoration: ${(props: StyledProps) => props.styled.textDecoration};
	`;

	return <Element styled={other}>{children}</Element>;
};

Typography.defaultProps = {
	element: `span`,
	display: `inline`,
	margin: `0`,
	padding: `0`,
	overflow: `visible`,

	color: `inherit`,

	fontFamily: `sans-serif`,
	fontWeight: `400`,
	fontSize: `1em`,
	fontFeatureSettings: `normal`,
	fontVariationSettings: `normal`,

	lineHeight: `normal`,

	textAlign: `start`,
	textTransform: `none`,
	textDecoration: `none`,
};

export default Typography;
