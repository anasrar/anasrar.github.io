import { readdir, readFile } from "node:fs/promises";
import type { APIContext } from "astro";
import { CollectionEntry, getCollection } from "astro:content";
import { html } from "satori-html";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

interface Props {
	post: CollectionEntry<"projects">;
}

export const getStaticPaths = async () => {
	const posts = await getCollection("projects");
	const paths: { params: { slug: string }; props: Props }[] = [];

	for (const post of posts) {
		paths.push({
			params: { slug: post.slug },
			props: {
				post,
			},
		});
	}

	return paths;
};

const iridescent = (
	await readdir("./src/iridescent/", { withFileTypes: true })
).filter((f) => f.isFile()).length;

export const get = async (context: APIContext) => {
	const { post } = context.props as Props;

	const template = html(`
<div style="position: relative; display: flex; flex-flow: column nowrap; justify-content: center; align-items: flex-start; width: 1200px; height: 630px; color: #dee2e6; background: #101113">
  <img style="position: absolute; top: 0; left: 672px;" src="http://127.0.0.1:5678/${
		(post.data.date.getDay() % iridescent) + 1
  }.png" />
  <div style="position: absolute; bottom: 40px; left: 40px; color: #868e96; font-weight: 500; font-size: 24px;">
    anasrar.github.io
  </div>
  <div style="width: 656px; margin: 0 40px; font-weight: 600; font-size: 72px; line-height: 110%">
  ${post.data.title}
  </div>
</div>
`);

	const svg = await satori(template, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Inter",
				data: await readFile("./src/fonts/Inter/Inter-500.ttf"),
				weight: 500,
				style: "normal",
			},
			{
				name: "Inter",
				data: await readFile("./src/fonts/Inter/Inter-600.ttf"),
				weight: 600,
				style: "normal",
			},
		],
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "width",
			value: 1200,
		},
	});

	const resvgData = resvg.render();
	const buffer = resvgData.asPng();

	return {
		body: buffer,
		encoding: "binary",
	};
};
