import React from "react";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "@hookstate/core";

import Data from "@/types/Data";

import CursorCustom from "@/components/CursorCustom";
import Container from "@/components/Container";
import Flex from "@/components/Flex";
import Typography from "@/components/Typography";
import Motion from "@/components/Motion";
import LinkChips from "@/components/LinkChips";
import LinkMenu from "@/components/LinkMenu";
import LinkGatsby from "@/components/LinkGatsby";
import LinkGatsbyMenu from "@/components/LinkGatsbyMenu";
import ThreeJSBackgroundProject from "@/components/ThreeJSBackgroundProject";

import DataProjectDetail from "@/data/ProjectDetail";

import { CursorTextScale, CursorText } from "@/states/Cursor";
import { PageShow } from "@/states/Page";
import { ProjectSection } from "@/states/Project";

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

const variantProjectDetail = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			staggerChildren: 0.1,
		},
	},
	out: {
		opacity: 0,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
};

const ProjectDetail: React.FC = () => {
	const localProjectSection = useState(ProjectSection);
	const [page, direction, canScroll] =
		localProjectSection.get() as Array<number>;

	return (
		<AnimatePresence custom={direction}>
			{canScroll === 1 && (
				<Flex flexFlow="column nowrap" gap=".75em">
					<section>
						<Typography
							element="section"
							display="block"
							fontFamily="'Fungis',sans-serif"
							fontWeight="700"
							fontSize="clamp(2em, 5vw, 3rem)"
							lineHeight="125%"
							textTransform="uppercase"
							overflow="hidden"
						>
							<motion.section
								initial={{ y: `100%` }}
								animate={{ y: 0 }}
								exit={{ y: `100%` }}
								transition={{ duration: 0.2 }}
							>
								{DataProjectDetail[page].title}
							</motion.section>
						</Typography>
						<Typography
							element="section"
							display="block"
							fontFamily="'NeutralFace', sans-serif"
							fontSize="1.125em"
							lineHeight="125%"
							overflow="hidden"
						>
							<motion.section
								initial={{ y: `100%` }}
								animate={{ y: 0 }}
								exit={{ y: `100%` }}
								transition={{ duration: 0.2 }}
							>
								{DataProjectDetail[page].description}
							</motion.section>
						</Typography>
					</section>
					<Flex flexFlow="column nowrap" gap="1em">
						<Typography
							element="section"
							display="block"
							fontFamily="'Sewaka', sans-serif"
							fontSize="1.125em"
							fontFeatureSettings="'dlig' 1,'ss01' 1,'ss02' 1,'ss03' 1"
							lineHeight="125%"
							overflow="hidden"
						>
							<motion.section
								initial={{ y: `100%` }}
								animate={{ y: 0 }}
								exit={{ y: `100%` }}
								transition={{ duration: 0.2 }}
							>
								<Flex
									flexFlow="row wrap"
									gap="1em"
									justifyContent="flex-start"
									alignItems="center"
								>
									{DataProjectDetail[page].stacks.map(
										({ id, icon: Icon, name }) => (
											<Flex
												flexFlow="row nowrap"
												justifyContent="center"
												alignItems="center"
												gap=".5em"
												key={id}
											>
												<Icon />
												<section>{name}</section>
											</Flex>
										),
									)}
								</Flex>
							</motion.section>
						</Typography>
						<Flex flexFlow="column nowrap" overflow="hidden">
							<motion.section
								initial={{ y: `100%` }}
								animate={{ y: 0 }}
								exit={{ y: `100%` }}
								transition={{ duration: 0.2 }}
							>
								<Flex flexFlow="row wrap" gap="1em">
									{DataProjectDetail[page].links.map(({ id, link, text }) => (
										<section key={id}>
											<LinkChips
												href={link}
												icon={null}
												target="_blank"
												rel="noopener noreferrer"
												hideTextWhenMobile={false}
												onHoverStart={() => {
													CursorText.set((_) => `OPEN SITE`);
													CursorTextScale.set((_) => 1);
												}}
												onHoverEnd={() => {
													CursorTextScale.set(() => 0);
												}}
											>
												{text}
											</LinkChips>
										</section>
									))}
								</Flex>
							</motion.section>
						</Flex>
					</Flex>
				</Flex>
			)}
		</AnimatePresence>
	);
};

const Project: React.FC<PageProps> = ({ data }) => {
	const { title } = (data as Data).site.siteMetadata;

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
				<title>Project - {title}</title>
			</Helmet>
			<ThreeJSBackgroundProject />
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
					<Container
						margin="auto 0 0 0"
						padding="clamp(1em, 3vw, 2em)"
						color="#fff"
						mixBlendMode="difference"
					>
						<Motion>
							<motion.section
								variants={variantProjectDetail}
								initial="hidden"
								animate="show"
								exit="out"
							>
								<ProjectDetail />
							</motion.section>
						</Motion>
					</Container>
				</Flex>
			</Container>
			<CursorCustom />
		</>
	);
};

export default Project;

export const query = graphql`
	query PageProjectQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
