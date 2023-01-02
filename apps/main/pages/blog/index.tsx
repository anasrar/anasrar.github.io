import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { allBlogs, Blog } from "contentlayer/generated";
import { FC } from "react";
import { Container, Grid, Stack, Text, Title } from "@mantine/core";

const Head = dynamic(() =>
	import("../../components/global/Head").then((c) => c.Head)
);
const OpenGraph = dynamic(() =>
	import("../../components/global/OpenGraph").then((c) => c.OpenGraph)
);
const LinkedDataJSON = dynamic(() =>
	import("../../components/global/LinkedDataJSON").then(
		(c) => c.LinkedDataJSON
	)
);
const A = dynamic(() =>
	import("../../components/markdown/components").then((c) => c.A)
);
const BlogCard = dynamic(() =>
	import("../../components/global/BlogCard").then((c) => c.BlogCard)
);

type StaticProps = {
	posts: Blog[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const compareDesc = (await import("date-fns")).compareDesc;

	const posts = allBlogs
		.sort((a, b) => {
			return compareDesc(new Date(a.date), new Date(b.date));
		})
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

const title = "Blog - Anas Rin";
const description =
	"Mostly write all about programming, projects, and technology. I also post on DEV Community 👩‍💻👨‍💻.";

const BlogPage: FC<StaticProps> = ({ posts }) => {
	const { pathname } = useRouter();

	return (
		<main>
			<Head title={title} description={description} />
			<OpenGraph
				basic={{
					title: title,
					description: description,
					type: "website",
					image: `https://avatars.githubusercontent.com/u/38805204`,
					url: `${process.env.SITE_URL}${pathname}/`,
					locale: "en_US",
					site_name: "Anas Rin",
				}}
				data={null}
				twitter={{
					card: "summary",
					title: title,
					site: "@rrrriiiiiinnnn",
					description: description,
					image: "https://avatars.githubusercontent.com/u/38805204",
				}}
			/>
			<LinkedDataJSON
				data={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: title,
					description: description,
					publisher: {
						"@type": "ProfilePage",
						name: "Anas Rin",
					},
				}}
			/>

			<Container size="sm" p="sm" pb="xl">
				<Stack spacing="lg" pt="xl">
					<Stack spacing={0}>
						<Title size="h3" order={2}>
							Blog
						</Title>
						<Text weight={600} size="sm" color="dimmed">
							Mostly write all about programming, projects, and
							technology. I also post on{" "}
							<A href="//dev.to/anasrin" newTab>
								DEV Community 👩‍💻👨‍💻
							</A>
							.
						</Text>
					</Stack>
					<Grid gutter="lg" justify="center">
						{posts.map((post, i) => (
							<Grid.Col span={12} xs={6} key={i}>
								<BlogCard hideTumbnail {...post} />
							</Grid.Col>
						))}
					</Grid>
				</Stack>
			</Container>
		</main>
	);
};

export default BlogPage;
