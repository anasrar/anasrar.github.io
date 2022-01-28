import React from "react";
import { Helmet } from "react-helmet";

import Container from "@/components/Container";
import Flex from "@/components/Flex";
import Typography from "@/components/Typography";

const NotFound: React.FC = () => (
	<>
		<Helmet>
			<title>Page Not Found</title>
		</Helmet>
		<Container>
			<Flex flexFlow="column nowrap" justifyContent="center" alignItems="center" minHeight="100vh">
				<Typography fontFamily="'NeutralFace', sans-serif" fontWeight="700" fontSize="clamp(1.5em, 3vw, 2em)">Page Not Found</Typography>
			</Flex>
		</Container>
	</>
);

export default NotFound;
