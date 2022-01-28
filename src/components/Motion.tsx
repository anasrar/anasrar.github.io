import React from "react";
import { AnimatePresence } from "framer-motion";
import { useState } from "@hookstate/core";

import { PageShow } from "@/states/Page";

const Motion: React.FC = ({ children }) => {
	const localPageShow = useState(PageShow);
	return <AnimatePresence>{localPageShow.get() && children}</AnimatePresence>;
};

export default Motion;
