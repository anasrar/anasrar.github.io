import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { allProjects, Projects } from "contentlayer/generated";
import { FC, useMemo } from "react";
import { Container, Divider, Stack } from "@mantine/core";

const globals = (await import("../../components/markdown/globals")).globals;
const substitution = (await import("../../components/markdown/substitution"))
	.substitution;
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
const TOC = dynamic(() =>
	import("../../components/global/TOC").then((c) => c.TOC)
);
const ProjectHeader = dynamic(() =>
	import("../../components/global/ProjectHeader").then((c) => c.ProjectHeader)
);
const useMDXComponent = (await import("next-contentlayer/hooks"))
	.useMDXComponent;

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: string[] = allProjects.map((post) => `/${post.url}`);

	return {
		paths,
		fallback: false,
	};
};

type StaticProps = {
	project: Projects;
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
	params,
}) => {
	const slug = `projects/${(params?.slug as string[]).join("/")}`;
	const originalProject: Projects = allProjects.find(
		(project) => project._raw.flattenedPath === slug
	)!;

	const project = structuredClone(originalProject);
	project._raw.flattenedPath = "";
	project._raw.sourceFileDir = "";
	project._raw.sourceFileName = "";
	project._raw.sourceFilePath = "";
	project.body.raw = "";

	return {
		props: {
			project,
		},
	};
};

const ProjectPage: FC<StaticProps> = ({ project }) => {
	const { basePath } = useRouter();
	const { body, title, toc, url, summary } = project;
	const g = useMemo(() => globals, []);
	const MDXContent = useMDXComponent(body.code, g);

	return (
		<main>
			<Head title={`${title} - Anas Rin`} description={summary} />
			<OpenGraph
				basic={{
					title: `${title} - Anas Rin`,
					description: summary,
					type: "website",
					image: `https://avatars.githubusercontent.com/u/38805204`,
					url: `${process.env.SITE_URL}${basePath}/${url}/`,
					locale: "en_US",
					site_name: "Anas Rin",
				}}
				data={null}
				twitter={{
					card: "summary",
					title: title,
					site: "@rrrriiiiiinnnn",
					description: summary,
					image: "https://avatars.githubusercontent.com/u/38805204",
				}}
			/>
			<LinkedDataJSON
				data={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					url: `${process.env.SITE_URL}${basePath}/${url}/`,
					name: title,
					description: summary,
					publisher: {
						"@type": "ProfilePage",
						name: "Anas Rin",
					},
				}}
			/>

			<Container size="sm" p="xs" pb="xl">
				<Stack spacing="sm" pt="xl">
					{toc.length ? <TOC items={toc} /> : null}
					<ProjectHeader {...project} />
					<Divider />
					<div>
						<MDXContent components={substitution} />
					</div>
				</Stack>
			</Container>
		</main>
	);
};

export default ProjectPage;
