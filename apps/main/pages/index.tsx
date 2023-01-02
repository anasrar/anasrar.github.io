import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Button,
	Container,
	createStyles,
	Grid,
	Group,
	Image,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconMailForward } from "@tabler/icons";
import { allBlogs, Blog } from "contentlayer/generated";

const Head = dynamic(() =>
	import("../components/global/Head").then((c) => c.Head)
);
const OpenGraph = dynamic(() =>
	import("../components/global/OpenGraph").then((c) => c.OpenGraph)
);
const LinkedDataJSON = dynamic(() =>
	import("../components/global/LinkedDataJSON").then((c) => c.LinkedDataJSON)
);
const BlogCard = dynamic(() =>
	import("../components/global/BlogCard").then((c) => c.BlogCard)
);

type StaticProps = {
	posts: Blog[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const compareDesc = (await import("date-fns")).compareDesc;

	const posts = allBlogs
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
		.slice(0, 2)
		// deep clone and remove unnecessary props
		.map((post) => {
			const copy = structuredClone(post);
			copy._raw.flattenedPath = "";
			copy._raw.sourceFileDir = "";
			copy._raw.sourceFileName = "";
			copy._raw.sourceFilePath = "";
			copy.body.raw = "";
			copy.body.code = "";
			copy.authors = [];
			copy.dataAuthors = {};
			copy.toc = [];
			copy.ogImage = {};
			copy.locale = "";
			copy.localeAlternate = {};
			return copy;
		});

	return {
		props: { posts },
	};
};

const useStyles = createStyles((theme) => ({
	profileContainer: {
		display: "flex",
		flexFlow: "row-reverse nowrap",
		justifyContent: "space-between",
		gap: theme.spacing.md,
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
		"@media (max-width: 600px)": {
			flexFlow: "column nowrap",
		},
	},
}));

const title = "Anas Rin";
const description =
	"Create and develop web app using TypeScript, Next.js, Go, SQL database, React, Vue, and Svelte. Contribute to open-source community. Interested in web technology, 3D in technical side, game development, and technology in general.";

export const RootPage: FC<StaticProps> = ({ posts }) => {
	const { basePath } = useRouter();
	const { classes } = useStyles();

	return (
		<main>
			<Head
				title={title}
				description={`Full-Stack Developer - ${description}`}
			/>
			<OpenGraph
				basic={{
					title: title,
					type: "profile",
					image: `https://avatars.githubusercontent.com/u/38805204`,
					url: `${process.env.SITE_URL}${basePath}`,
					locale: "en_US",
					site_name: "Anas Rin",
				}}
				data={{
					"profile:first_name": "Anas",
					"profile:last_name": "Rin",
					"profile:username": "anasrar",
					"profile:gender": "male",
				}}
				twitter={{
					card: "summary",
					title: title,
					site: "@rrrriiiiiinnnn",
					description: `Full-Stack Developer - ${description}`,
					image: "https://avatars.githubusercontent.com/u/38805204",
				}}
			/>
			<LinkedDataJSON
				data={{
					"@context": "https://schema.org",
					"@type": "Person",
					email: "mynameanasrar@gmail.com",
					image: "https://avatars.githubusercontent.com/u/38805204",
					jobTitle: "Full-Stack Developer",
					name: "Anas Rin",
					gender: "male",
					url: "https://anasrar.gihub.io/",
					sameAs: [
						"http://twitter.com/rrrriiiiiinnnn/",
						"http://youtube.com/@anasrin/",
						"http://github.com/anasrar/",
					],
				}}
			/>

			<Container size="sm" p="sm" pb="xl">
				<Stack spacing="sm">
					<div className={classes.profileContainer}>
						<Image
							src="//avatars.githubusercontent.com/u/38805204"
							alt="Anas Rin"
							width={140}
							height={140}
							radius={70}
						/>
						<Stack spacing={0}>
							<Title order={1}>Anas Rin</Title>
							<Title order={2} size="h4">
								Full-Stack Developer
							</Title>
							<Text
								component="p"
								mt="md"
								mb={0}
								color="dimmed"
								weight={500}
								size="sm"
							>
								{description}
							</Text>
							<Group mt="md">
								<Button
									component="a"
									href="mailto:mynameanasrar@gmail.com"
									size="xs"
									color="indigo"
									leftIcon={<IconMailForward />}
								>
									Contact Me
								</Button>
							</Group>
						</Stack>
					</div>
					<Stack spacing="md">
						<Group position="apart">
							<Title order={3}>Blog</Title>
							<Button
								component={Link}
								href="./blog"
								compact
								size="xs"
								variant="light"
								color="indigo"
							>
								Show all
							</Button>
						</Group>
						<Grid gutter="lg" justify="center">
							{posts.map((post, i) => {
								return (
									<Grid.Col span={12} xs={6} key={i}>
										<BlogCard hideTumbnail {...post} />
									</Grid.Col>
								);
							})}
						</Grid>
					</Stack>
				</Stack>
			</Container>
		</main>
	);
};

export default RootPage;
