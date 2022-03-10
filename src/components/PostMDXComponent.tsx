import React from "react";
import styled from "@emotion/styled";
import { motion, HTMLMotionProps } from "framer-motion";
import Highlight, { defaultProps } from "prism-react-renderer";
import HighlightTheme from "prism-react-renderer/themes/palenight";

import Typography from "./Typography";
import Flex from "./Flex";

import { CursorTextScale, CursorText } from "@/states/Cursor";

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

const Image = styled(motion.img)`
	margin: 0 auto;
	cursor: zoom-in;
`;
const img: React.FC<HTMLMotionProps<"img">> = ({ ...props }) => (
	<Image
		onClick={(ev: React.MouseEvent<HTMLImageElement>) => {
			window.open((ev.target as HTMLImageElement).src, `_blank`);
		}}
		onHoverStart={() => {
			CursorText.set((_) => `IMAGE`);
			CursorTextScale.set((_) => 1);
		}}
		onHoverEnd={() => {
			CursorTextScale.set(() => 0);
		}}
		{...props}
	/>
);

const Anchor = styled(motion.a)`
	color: #80dada;
	text-decoration: #8080ff wavy underline;
`;
const a: React.FC = ({ children, ...props }) => (
	<Anchor
		onHoverStart={() => {
			CursorText.set((_) => `LINK`);
			CursorTextScale.set((_) => 1);
		}}
		onHoverEnd={() => {
			CursorTextScale.set(() => 0);
		}}
		{...props}
	>
		{children}
	</Anchor>
);

const ul: React.FC = ({ children, ...props }) => (
	<Flex
		element="ul"
		margin="0 0 .75rem 0"
		flexFlow="column nowrap"
		gap=".5rem"
		{...props}
	>
		{children}
	</Flex>
);

const List = styled.li`
	list-style: "◉  " inside;
`;
const li: React.FC = ({ children, ...props }) => (
	<List {...props}>{children}</List>
);

const pre: React.FC = ({ children }) => {
	const childrenProps = (children as JSX.Element).props;
	const language = childrenProps.className.replace(/language-/, ``) || ``;

	return (
		<Highlight
			{...defaultProps}
			code={childrenProps.children.trim()}
			language={language}
			theme={HighlightTheme}
		>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className} style={{ ...style }}>
					<div>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</div>
				</pre>
			)}
		</Highlight>
	);
};

const BlockQuote = styled.blockquote`
	margin: 0 0 0.75rem 0;
	padding: 1rem;
	border-left: 0.5rem solid #fff;
	border-radius: 0.4rem;
	background: rgba(255, 255, 255, 0.1);
`;
const blockquote: React.FC = ({ children }) => (
	<BlockQuote>{children}</BlockQuote>
);

const PostMDXComponent = {
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,

	a,
	p,
	img,

	ul,
	li,

	pre,
	blockquote,
};

export default PostMDXComponent;
