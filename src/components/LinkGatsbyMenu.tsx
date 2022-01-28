import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import styled from "@emotion/styled";

import GenerateLinkClickHandler from "@/utilities/GenerateLinkClickHandler";

interface Props {
	invert?: boolean;
}

interface StyledProps extends GatsbyLinkProps<any> {
	styled: Props;
}

const LinkElement = styled(Link)<StyledProps>`
	display: inline-flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 0.5em;
	padding: 0.25rem 0.75rem;

	border: 1px solid #fff;
	border-radius: 1.5rem;

	background: ${(props: StyledProps) =>
		props.styled.invert ? `#fff` : `transparent`};
	color: ${(props: StyledProps) => (props.styled.invert ? `#000` : `#fff`)};

	font-family: "Sewaka", sans-serif;
	font-feature-settings: "dlig" 1, "ss01" 1, "ss02" 1, "ss03" 1;
	text-decoration: none;
`;

interface LinkProps {
	to: string;
	invert?: boolean;
}

const LinkGatsbyMenu: React.FC<LinkProps> = ({
	children,
	to,
	invert,
	...other
}) => (
	<LinkElement
		to={to}
		styled={{ invert }}
		{...other}
		onClick={GenerateLinkClickHandler(to, 1)}
	>
		{children}
	</LinkElement>
);

LinkGatsbyMenu.defaultProps = {
	invert: false,
};

export default LinkGatsbyMenu;
