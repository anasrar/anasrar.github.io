import React from "react";
import styled from "@emotion/styled";
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"a"> {
	invert?: boolean;
}

interface StyledProps {
	styled: Props;
}

const Link = styled(motion.a)<StyledProps>`
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

const LinkMenu: React.FC<Props> = ({ children, invert, ...other }) => (
	<Link styled={{ invert }} {...other}>
		{children}
	</Link>
);

LinkMenu.defaultProps = {
	invert: false,
};

export default LinkMenu;
