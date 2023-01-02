import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC } from "react";
import { Container, Grid, Stack, Text, Title } from "@mantine/core";
import { allProjects, Projects } from "contentlayer/generated";

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
const ProjectCard = dynamic(() =>
	import("../../components/global/ProjectCard").then((c) => c.ProjectCard)
);

type StaticProps = {
	projects: Projects[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const compareDesc = (await import("date-fns")).compareDesc;

	const projects = allProjects
		.sort((a, b) => {
			return compareDesc(new Date(a.date), new Date(b.date));
		})
		// deep clone and remove unnecessary props
		.map((project) => {
			const copy = structuredClone(project);
			copy._raw.flattenedPath = "";
			copy._raw.sourceFileDir = "";
			copy._raw.sourceFileName = "";
			copy._raw.sourceFilePath = "";
			copy.body.raw = "";
			copy.body.code = "";
			copy.summary = "";
			return copy;
		});

	return {
		props: { projects },
	};
};

const title = "Projects - Anas Rin";
const description =
	"Showcase my top projects, you can visit my GitHub repository to see all my projects.";

const BlogPage: FC<StaticProps> = ({ projects }) => {
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
					"@type": "WebSite",
					url: `${process.env.SITE_URL}${pathname}/`,
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
							Projects
						</Title>
						<Text weight={600} size="sm" color="dimmed">
							Showcase my top projects, you can visit{" "}
							<A
								href="//github.com/anasrar?tab=repositories"
								newTab
							>
								my GitHub repository
							</A>{" "}
							to see all my projects.
						</Text>
					</Stack>
					<Grid gutter="lg" justify="center">
						{projects.map((project, i) => (
							<Grid.Col span={12} xs={6} key={i}>
								<ProjectCard hideTumbnail {...project} />
							</Grid.Col>
						))}
					</Grid>
				</Stack>
			</Container>
		</main>
	);
};

export default BlogPage;
