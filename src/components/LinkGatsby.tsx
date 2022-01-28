import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import styled from "@emotion/styled";

import GenerateLinkClickHandler from "@/utilities/GenerateLinkClickHandler";

const StyledLink = styled(Link)`
	text-decoration: none;
`;

// tslint:disable-next-line
interface Props extends Omit<GatsbyLinkProps<Record<string, unknown>>, "ref"> {}

const LinkGatsby: React.FC<Props> = ({ children, to, ...other }) => (
	<StyledLink to={to} {...other} onClick={GenerateLinkClickHandler(to, 1)}>
		{children}
	</StyledLink>
);

export default LinkGatsby;
