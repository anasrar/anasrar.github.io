import React from "react";
import styled from "@emotion/styled";

interface Props {
	position?: string;
	display?: string;
	order?: string;
	flex?: string;
	alignSelf?: string;
}

interface StyledProps {
	styled: Props;
}

const Section = styled.section<StyledProps>`
	position: ${(props: StyledProps) => props.styled.position};
	display: ${(props: StyledProps) => props.styled.display};
	order: ${(props: StyledProps) => props.styled.order};
	flex: ${(props: StyledProps) => props.styled.flex};
	align-self: ${(props: StyledProps) => props.styled.alignSelf};
`;

const FlexItem: React.FC<Props> = ({ children, ...other }) => (
	<Section styled={other}>{children}</Section>
);

FlexItem.defaultProps = {
	position: `block`,
	display: `block`,
	order: `0`,
	flex: `0 1 auto`,
	alignSelf: `auto`,
};

export default FlexItem;
