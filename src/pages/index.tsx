import React from "react";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import Data from "@/types/Data";

import ThreeJSBackground from "@/components/ThreeJSBackground";
import Container from "@/components/Container";
import Flex from "@/components/Flex";
import Typography from "@/components/Typography";
import Motion from "@/components/Motion";
import LinkMenu from "@/components/LinkMenu";
import LinkGatsby from "@/components/LinkGatsby";
import LinkGatsbyMenu from "@/components/LinkGatsbyMenu";
import LinkChips from "@/components/LinkChips";
import CursorCustom from "@/components/CursorCustom";

import IconGitHub from "@/icons/GitHub";
import IconTwitter from "@/icons/Twitter";
import IconYouTube from "@/icons/YouTube";

import { CursorText, CursorTextScale } from "@/states/Cursor";
import { PageShow } from "@/states/Page";

const LinkFooter: Array<{
	id: string;
	text: string;
	url: string;
	icon: React.ReactNode;
}> = [
	{
		id: `A`,
		text: `GitHub`,
		url: `//github.com/anasrar`,
		icon: <IconGitHub />,
	},
	{
		id: `B`,
		text: `Twitter`,
		url: `//twitter.com/rrrriiiiiinnnn`,
		icon: <IconTwitter />,
	},
	{
		id: `C`,
		text: `YouTube`,
		url: `//www.youtube.com/channel/UCSPcMosP3pxsP8a9t9AGwaQ/videos`,
		icon: <IconYouTube />,
	},
];

const logoVariant = {
	hidden: {
		translateY: `-100%`,
	},
	show: {
		translateY: 0,
		transition: {
			duration: 1,
			delay: 3.75,
		},
	},
	out: {
		translateY: `-100%`,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
};

const text1Variant = {
	hidden: {
		y: `100%`,
	},
	show: {
		y: `0`,
		transition: {
			duration: 1,
			delay: 2.75,
		},
	},
	out: {
		y: `100%`,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
};

const generateLinkMenuVariant = (index: number) => ({
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			delay: 0.25 * index + 4.75,
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

const generateLinkFooterVariant = (index: number) => ({
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1.5,
			delay: index * 0.25 + 6.25,
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

const copyVariant = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			delay: 8,
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

const Home: React.FC<PageProps> = ({ data }) => {
	const { title, description } = (data as Data).site.siteMetadata;

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
				<title>
					{title} - {description}
				</title>
			</Helmet>
			<ThreeJSBackground />
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
											variants={logoVariant}
											initial="hidden"
											animate="show"
											exit="out"
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
										variants={generateLinkMenuVariant(0)}
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
										variants={generateLinkMenuVariant(0)}
										initial="hidden"
										animate="show"
										exit="out"
										onHoverStart={() => {
											CursorText.set((_) => `PORJECT`);
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
						<Flex flexFlow="column nowrap" alignItems="flex-start">
							<Typography
								element="section"
								display="block"
								fontFamily="'Fungis', sans-serif"
								fontSize="clamp(2em, 5vw, 3rem)"
								textTransform="uppercase"
								overflow="hidden"
							>
								<Motion>
									<motion.section
										variants={text1Variant}
										initial="hidden"
										animate="show"
										exit="out"
									>
										Full-Stack Developer
									</motion.section>
								</Motion>
							</Typography>
							<Typography
								element="section"
								display="block"
								fontFamily="'Fungis', sans-serif"
								fontSize="clamp(2em, 5vw, 3rem)"
								textTransform="uppercase"
								overflow="hidden"
							>
								<Motion>
									<motion.section
										variants={text1Variant}
										initial="hidden"
										animate="show"
										exit="out"
									>
										who love 3D Rigging, Shader,
									</motion.section>
								</Motion>
							</Typography>
							<Typography
								element="section"
								display="block"
								fontFamily="'Fungis', sans-serif"
								fontSize="clamp(2em, 5vw, 3rem)"
								textTransform="uppercase"
								overflow="hidden"
							>
								<Motion>
									<motion.section
										variants={text1Variant}
										initial="hidden"
										animate="show"
										exit="out"
									>
										and Open-Source Enthusiast
									</motion.section>
								</Motion>
							</Typography>
						</Flex>
						<Typography
							element="section"
							display="block"
							fontFamily="'NeutralFace', sans-serif"
							fontSize="1.125em"
							lineHeight="125%"
							overflow="hidden"
						>
							<Motion>
								<motion.section
									variants={text1Variant}
									initial="hidden"
									animate="show"
									exit="out"
								>
									Back End Developer + Front End Developer + A Little Bit UI/UX
									+ 3D Rigger + Love Shader + Some Game Developer
								</motion.section>
							</Motion>
						</Typography>
						<Flex
							flexFlow="row nowrap"
							justifyContent="space-between"
							gap="1em"
							alignItems="center"
							margin="clamp(1em, 3vw, 2em) 0 0 0"
						>
							<Flex gap="1em">
								{LinkFooter.map(({ id, text, url, icon }, index) => (
									<Motion key={id}>
										<motion.section
											variants={generateLinkFooterVariant(index)}
											initial="hidden"
											animate="show"
											exit="out"
										>
											<LinkChips
												initial={{ rotate: -10 }}
												style={{
													originX: `calc(.75rem + .5em)`,
													originY: 0.5,
												}}
												whileHover={{ rotate: 0 }}
												href={url}
												icon={icon}
												target="_blank"
												rel="noopener noreferrer"
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
										</motion.section>
									</Motion>
								))}
							</Flex>
							<Typography
								element="section"
								display="block"
								fontFamily="'KharkivTone', sans-serif"
								textTransform="uppercase"
							>
								<Motion>
									<motion.section
										variants={copyVariant}
										initial="hidden"
										animate="show"
										exit="out"
									>
										&copy; {new Date().getFullYear()}
									</motion.section>
								</Motion>
							</Typography>
						</Flex>
					</Container>
				</Flex>
			</Container>
			<CursorCustom />
		</>
	);
};

export default Home;

export const query = graphql`
	query PageIndexQuery {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
