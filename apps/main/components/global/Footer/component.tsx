import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import {
	ActionIcon,
	Container,
	Group,
	MediaQuery,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import {
	IconAt,
	IconBrandGithub,
	IconBrandTwitter,
	IconBrandYoutube,
	IconRss,
} from "@tabler/icons";
import { A } from "components/markdown/components";

const startStack = "690px";

const links: [string, string, ReactNode][] = [
	[
		"Send Email",
		"mailto:mynameanasrar@gmail.com",
		<IconAt key="mail" size={18} />,
	],
	[
		"My Twitter Account",
		"//twitter.com/rrrriiiiiinnnn",
		<IconBrandTwitter key="twitter" size={18} />,
	],
	[
		"My YouTube Channel",
		"//youtube.com/@anasrin",
		<IconBrandYoutube key="youtube" size={18} />,
	],
	[
		"My GitHub Account",
		"//github.com/anasrar",
		<IconBrandGithub key="github" size={18} />,
	],
];

export const Footer: FC = () => {
	const { basePath } = useRouter();

	return (
		<footer>
			<Container size="sm" px="xs" pb="xl">
				<Stack spacing="xs">
					<Group position="apart" align="center" spacing="xs">
						<MediaQuery
							query={`(max-width: ${startStack})`}
							styles={{
								justifyContent: "center",
								flexBasis: "100%",
							}}
						>
							<Group position="left" spacing="xs">
								{links.map(([text, link, icon]) => (
									<Tooltip key={text} label={text}>
										<ActionIcon
											component="a"
											href={link}
											target="_blank"
											rel="noopener noreferrer"
											size="lg"
											variant="default"
											aria-label={text}
										>
											{icon}
										</ActionIcon>
									</Tooltip>
								))}
								<Tooltip label="RSS Blog">
									<ActionIcon
										component="a"
										href={`${basePath}/rss/blog.xml`}
										target="_blank"
										rel="noopener noreferrer"
										size="lg"
										variant="default"
										aria-label="RSS Blog"
									>
										<IconRss size={18} />
									</ActionIcon>
								</Tooltip>
							</Group>
						</MediaQuery>
						<MediaQuery
							query={`(max-width: ${startStack})`}
							styles={{
								flexBasis: "100%",
							}}
						>
							<Text weight={600} size="xs" align="center">
								Made With{" "}
								<Text span c="red.7">
									❤️
								</Text>{" "}
								Using{" "}
								<A href="//nextjs.org/" newTab>
									Next.js
								</A>
								,{" "}
								<A href="//www.contentlayer.dev/" newTab>
									Contentlayer
								</A>
								,{" "}
								<A href="//giscus.app/" newTab>
									Giscus
								</A>
								,{" "}
								<A href="//mantine.dev/" newTab>
									Mantine
								</A>
								, &{" "}
								<A href="//tabler-icons.io/" newTab>
									Tabler Icons
								</A>
							</Text>
						</MediaQuery>
					</Group>
				</Stack>
			</Container>
		</footer>
	);
};
