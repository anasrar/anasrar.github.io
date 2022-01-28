import React from "react";
import styled from "@emotion/styled";

import Typography from "./Typography";
import Flex from "./Flex";

const h1: React.FC = ({ children, ...props }) => (
	<Typography
		element="h1"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="3em"
		{...props}
	>
		{children}
	</Typography>
);

const h2: React.FC = ({ children, ...props }) => (
	<Typography
		element="h2"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="2.75em"
		{...props}
	>
		{children}
	</Typography>
);

const h3: React.FC = ({ children, ...props }) => (
	<Typography
		element="h3"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="2.5em"
		{...props}
	>
		{children}
	</Typography>
);

const h4: React.FC = ({ children, ...props }) => (
	<Typography
		element="h4"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="2.25em"
		{...props}
	>
		{children}
	</Typography>
);

const h5: React.FC = ({ children, ...props }) => (
	<Typography
		element="h5"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="2em"
		{...props}
	>
		{children}
	</Typography>
);

const h6: React.FC = ({ children, ...props }) => (
	<Typography
		element="h6"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="600"
		fontSize="1.75em"
		{...props}
	>
		{children}
	</Typography>
);

const p: React.FC = ({ children, ...props }) => (
	<Typography
		element="p"
		display="block"
		margin="0 0 .75rem 0"
		fontFamily="inherit"
		fontWeight="inherit"
		fontSize="inherit"
		{...props}
	>
		{children}
	</Typography>
);

const ul: React.FC = ({ children, ...props }) => (
	<Flex element="ul" flexFlow="column nowrap" gap=".5rem" {...props}>
		{children}
	</Flex>
);

const li: React.FC = ({ children, ...props }) => {
	const List = styled.li`
		list-style: "◉  " inside;
	`;

	return <List {...props}>{children}</List>;
};

const PostMDXComponent = {
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,

	p,

	ul,
	li,
};

export default PostMDXComponent;
