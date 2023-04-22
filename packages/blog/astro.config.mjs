import { readFile } from "node:fs/promises";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeDiagrams from "diagrams";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";

/** @type {import("rehype-pretty-code").Options} */
export const rehypePrettyCodeOptions = {
	theme: JSON.parse(
		await readFile("./src/shiki/themes/tokyo-night.json", "utf8")
	),
	keepBackground: false,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className.push("highlighted");
	},
	onVisitHighlightedWord(node) {
		node.properties.className = ["word"];
	},
};

/** @type {import("astro/config").AstroUserConfig} */
export const config = {
	site: "https://anasrar.github.io",
	output: "static",
	trailingSlash: "always",
	integrations: [
		mdx({
			rehypePlugins: [
				[rehypeDiagrams, {}],
				[rehypeKatex, {}],
				[rehypePrettyCode, rehypePrettyCodeOptions],
			],
			remarkPlugins: [[remarkMath, {}]],
		}),
		sitemap(),
	],
	markdown: {
		syntaxHighlight: false,
	},
	vite: {
		optimizeDeps: {},
	},
};

export default defineConfig(config);
