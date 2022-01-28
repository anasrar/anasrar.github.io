import React from "react";
import styled from "@emotion/styled";
import { motion, HTMLMotionProps } from "framer-motion";

import { CursorText, CursorTextScale } from "@/states/Cursor";

interface Props extends HTMLMotionProps<"button"> {
	active?: boolean;
	onHoverStart?: () => any;
	onHoverEnd?: () => any;
}

const Button = styled(motion.button)<Props>`
	background: transparent;
	width: 1em;
	aspect-ratio: 1 / 1;

	border: 2px solid #fff;
	border-radius: 50%;

	transition: all 0.5s linear;

	&.active {
		background: #fff;
	}
`;

const Indicator: React.FC<Props> = ({ children, active, ...other }) => (
	<Button className={active ? `active` : ``} {...other}>
		{children}
	</Button>
);

Indicator.defaultProps = {
	active: false,
	onHoverStart: () => {
		CursorText.set((_) => `INDICATOR`);
		CursorTextScale.set((_) => 1);
	},
	onHoverEnd: () => {
		CursorTextScale.set(() => 0);
	},
};

export default Indicator;
