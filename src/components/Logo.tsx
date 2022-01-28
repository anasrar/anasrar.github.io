import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useState } from "@hookstate/core";

import { PageShow } from "@/states/Page";

const Logo: React.FC<HTMLMotionProps<"section">> = ({ children, ...other }) => {
	const localPageShow = useState(PageShow);
	return (
		<AnimatePresence>
			{localPageShow.get() && (
				<motion.section {...other}>{children}</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Logo;
