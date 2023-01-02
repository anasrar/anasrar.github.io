import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
	allBlogs,
	allBlogTranslates,
	Blog,
	BlogTranslate,
} from "contentlayer/generated";
import { Author } from "authors";
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
const Language = dynamic(() =>
	import("../../components/global/Language").then((c) => c.Language)
);
const TOC = dynamic(() =>
	import("../../components/global/TOC").then((c) => c.TOC)
);
const BlogHeader = dynamic(() =>
	import("../../components/global/BlogHeader").then((c) => c.BlogHeader)
);
const Comment = dynamic(() =>
	import("../../components/global/Comment").then((c) => c.Comment)
);
const useMDXComponent = (await import("next-contentlayer/hooks"))
	.useMDXComponent;

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: string[] = [
		...allBlogs.map((post) => `/${post.url}`),
		...allBlogTranslates.map((post) => `/${post.url}`),
	];

	return {
		paths,
		fallback: false,
	};
};

type StaticProps = {
	post: Blog | BlogTranslate;
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
	params,
}) => {
	const slug = `blog/${(params?.slug as string[]).join("/")}`;
	const originalPost: Blog | BlogTranslate = [
		...allBlogs,
		...allBlogTranslates,
	].find((post) => post._raw.flattenedPath === slug)!;

	const post = structuredClone(originalPost);
	post._raw.flattenedPath = "";
	post._raw.sourceFileDir = "";
	post._raw.sourceFileName = "";
	post._raw.sourceFilePath = "";
	post.body.raw = "";
	post.ogImage = {};

	return {
		props: {
			post,
		},
	};
};

const PostPage: FC<StaticProps> = ({ post }) => {
	const { basePath } = useRouter();
	const {
		body,
		title,
		date,
		lastmod,
		dataAuthors,
		tags,
		toc,
		locale,
		localeAlternate,
		url,
		summary,
	} = post;
	const g = useMemo(() => globals, []);
	const MDXContent = useMDXComponent(body.code, g);

	return (
		<main>
			<Head title={`${title} - Anas Rin`} description={summary} />
			<OpenGraph
				basic={{
					title: `${title} - Anas Rin`,
					description: summary,
					type: "article",
					image: `${process.env.SITE_URL}${basePath}/assets/${url}/og.png`,
					url: `${process.env.SITE_URL}${basePath}/${url}/`,
					locale: localeAlternate[locale].og,
					"locale:alternate": Object.values(
						localeAlternate as Record<string, { og: string }>
					).map(({ og }) => og),
					site_name: "Anas Rin",
				}}
				data={{
					"article:published_time": date,
					"article:modified_time": lastmod ?? "",
					"article:expiration_time": "",
					"article:author": Object.values(
						dataAuthors as Record<string, Author>
					).map((a) => a.url),
					"article:section": "",
					"article:tag": tags,
				}}
				twitter={{
					card: "summary_large_image",
					title: title,
					site: "@rrrriiiiiinnnn",
					description: summary,
					image: `${
						process.env.SITE_URL as `https://`
					}${basePath}/assets/${url}/og.png`,
				}}
			/>
			<LinkedDataJSON
				data={{
					"@context": "https://schema.org",
					"@type": "Article",
					headline: title,
					image: `${process.env.SITE_URL}${basePath}/assets/${url}/og.png`,
					author: Object.entries(
						dataAuthors as Record<string, { url: string }>
					).map(([author, props]) => ({
						"@type": "Person",
						name: author,
						url: props.url,
					})),
					url: `${process.env.SITE_URL}${basePath}/${url}/`,
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": "https://google.com/article",
					},
					datePublished: date,
					dateModified: lastmod,
					description: summary,
				}}
			/>

			<Container size="sm" p="xs" pb="xl">
				<Stack spacing="sm" pt="xl">
					<Language active={locale} items={localeAlternate} />
					{toc.length ? <TOC items={toc} /> : null}
					<BlogHeader {...post} />
					<Divider />
					<div>
						<MDXContent components={substitution} />
					</div>
					<Comment
						lang={localeAlternate[locale].giscusLang}
						directComment={
							localeAlternate[locale].giscusDirectComment
						}
						writeComment={
							localeAlternate[locale].giscusWriteComment
						}
					/>
				</Stack>
			</Container>
		</main>
	);
};

export default PostPage;
