import React from "react";
import styled from "@emotion/styled";
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"a"> {
	icon: React.ReactNode;
	hideTextWhenMobile?: boolean;
}

interface CSSProps {
	hideTextWhenMobile: boolean;
}

interface StyledProps {
	styled: CSSProps;
}

const Link = styled(motion.a)<StyledProps>`
	display: inline-flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 0.5em;
	padding: 0.25rem 0.75rem;

	border: 1px solid #fff;
	border-radius: 1.5rem;

	background: transparent;
	color: #fff;

	font-family: "Sewaka", sans-serif;
	font-feature-settings: "dlig" 1, "ss01" 1, "ss02" 1, "ss03" 1;
	text-decoration: none;
	${(props: StyledProps) =>
		props.styled.hideTextWhenMobile
			? `@media (max-width: 500px) {padding: .75rem;}`
			: ``}
`;

const Section = styled.section<StyledProps>`
	font-size: 1em;
	${(props: StyledProps) =>
		props.styled.hideTextWhenMobile
			? `@media (max-width: 500px) { display: none;}`
			: ``}
`;

const LinkChips: React.FC<Props> = ({
	children,
	icon,
	hideTextWhenMobile,
	...other
}) => (
	<Link styled={{ hideTextWhenMobile }} {...other}>
		{icon}
		{` `}
		<Section styled={{ hideTextWhenMobile }}>{children}</Section>
	</Link>
);

LinkChips.defaultProps = {
	hideTextWhenMobile: true,
};

export default LinkChips;
