import { readFile } from "node:fs/promises";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeDiagrams from "diagrams";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import vercel from "@astrojs/vercel/serverless";

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
	site: "https://anasrin.vercel.app",
	output: "server",
	adapter: vercel(),
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
	],
	markdown: {
		syntaxHighlight: false,
	},
	vite: {
		optimizeDeps: {},
	},
};

// https://astro.build/config
export default defineConfig(config);