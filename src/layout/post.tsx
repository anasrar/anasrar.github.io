import React from "react";
import { Helmet } from "react-helmet";
import { graphql, PageProps } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { motion } from "framer-motion";

import Data from "@/types/Data";

import CursorCustom from "@/components/CursorCustom";
import Container from "@/components/Container";
import Flex from "@/components/Flex";
import FlexItem from "@/components/FlexItem";
import Typography from "@/components/Typography";
import Motion from "@/components/Motion";
import LinkMenu from "@/components/LinkMenu";
import LinkGatsby from "@/components/LinkGatsby";
import LinkGatsbyMenu from "@/components/LinkGatsbyMenu";
import PostMDXComponent from "@/components/PostMDXComponent";

import { CursorTextScale, CursorText } from "@/states/Cursor";
import { PageShow } from "@/states/Page";

const generateLinkMenuVariant = (index: number) => ({
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			delay: 0.25 * index,
		},
	},
	out: {
		opacity: 0,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
});

const Blog: React.FC<PageProps> = ({ data }) => {
	const {
		frontmatter: { title, date },
		body,
	} = (data as Data).mdx;

	React.useEffect(() => {
		CursorTextScale.set(() => 0);
		PageShow.set(() => true);

		return () => {
			CursorTextScale.set(() => 0);
		};
	});

	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Container element="main">
				<Flex flexFlow="column nowrap" minHeight="100vh">
					<Container
						padding="clamp(1em, 3vw, 2em)"
						color="#fff"
						mixBlendMode="difference"
					>
						<Flex
							flexFlow="row nowrap"
							justifyContent="space-between"
							alignItems="center"
							overflow="hidden"
						>
							<Motion>
								<LinkGatsby to="/">
									<Typography
										element="section"
										display="block"
										color="#FFF"
										fontFamily="'KharkivTone', sans-serif"
										fontSize="clamp(1.125em, 3vw, 1.5em)"
										textTransform="uppercase"
										textDecoration="none"
									>
										<motion.section
											initial={{ translateY: `-100%` }}
											animate={{ translateY: 0 }}
											transition={{ duration: 1 }}
											exit={{ translateY: `-100%` }}
											onHoverStart={() => {
												CursorText.set((_) => `HOME`);
												CursorTextScale.set((_) => 1);
											}}
											onHoverEnd={() => {
												CursorTextScale.set(() => 0);
											}}
										>
											Anas Rin
										</motion.section>
									</Typography>
								</LinkGatsby>
							</Motion>
							<Flex gap="1em">
								<Motion>
									<motion.section
										variants={generateLinkMenuVariant(2)}
										initial="hidden"
										animate="show"
										exit="out"
										onHoverStart={() => {
											CursorText.set((_) => `BLOG`);
											CursorTextScale.set((_) => 1);
										}}
										onHoverEnd={() => {
											CursorTextScale.set(() => 0);
										}}
									>
										<LinkGatsbyMenu to="/blog">Blog</LinkGatsbyMenu>
									</motion.section>
								</Motion>
								<Motion>
									<motion.section
										variants={generateLinkMenuVariant(1)}
										initial="hidden"
										animate="show"
										exit="out"
										onHoverStart={() => {
											CursorText.set((_) => `PROJECT`);
											CursorTextScale.set((_) => 1);
										}}
										onHoverEnd={() => {
											CursorTextScale.set(() => 0);
										}}
									>
										<LinkGatsbyMenu to="/project">Project</LinkGatsbyMenu>
									</motion.section>
								</Motion>
								<Motion>
									<LinkMenu
										href="mailto:mynameanasrar@gmail.com"
										invert={true}
										variants={generateLinkMenuVariant(0)}
										initial="hidden"
										animate="show"
										exit="out"
										onHoverStart={() => {
											CursorText.set((_) => `E-MAIL`);
											CursorTextScale.set((_) => 1);
										}}
										onHoverEnd={() => {
											CursorTextScale.set(() => 0);
										}}
									>
										Contact
									</LinkMenu>
								</Motion>
							</Flex>
						</Flex>
					</Container>
					<FlexItem flex="1 0 auto">
						<Container
							margin="0 auto"
							maxWidth="60em"
							padding="clamp(1em, 3vw, 2em)"
							color="#fff"
							mixBlendMode="difference"
						>
							<Motion>
								<motion.section
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 1 }}
									exit={{ opacity: 0 }}
								>
									<Flex flexFlow="column nowrap" gap="2rem">
										<Flex flexFlow="column nowrap" gap=".5em">
											<Typography
												element="section"
												display="block"
												fontFamily="'NeutralFace', sans-serif"
												fontWeight="700"
												fontSize="clamp(1.25em, 3vw, 2em)"
												lineHeight="1.25em"
											>
												{title}
											</Typography>
											<Typography
												element="section"
												display="block"
												fontFamily="'KharkivTone', sans-serif"
												fontSize="clamp(.75em, 3vw, 1.125em)"
												textTransform="uppercase"
											>
												{date.replace(
													/(\d+)-(\d+)-(\d+)([TZ.:\d]+)/,
													`$3-$2-$1`,
												)}
											</Typography>
										</Flex>
										<Typography
											element="section"
											display="block"
											fontFamily="'CreatoDisplay', sans-serif"
											fontSize="1.125em"
										>
											<MDXProvider components={PostMDXComponent}>
												<MDXRenderer>{body}</MDXRenderer>
											</MDXProvider>
										</Typography>
									</Flex>
								</motion.section>
							</Motion>
						</Container>
					</FlexItem>
				</Flex>
			</Container>
			<CursorCustom />
		</>
	);
};

export default Blog;

export const query = graphql`
	query PostContentQuery($id: String) {
		mdx(id: { eq: $id }) {
			id
			body
			frontmatter {
				title
				date
			}
		}
		site {
			siteMetadata {
				description
				title
			}
		}
	}
`;
