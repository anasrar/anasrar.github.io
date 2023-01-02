import { makeSource } from "contentlayer/source-files";
import { Projects } from "./contentlayer/projects";
import { Blog, BlogTranslate } from "./contentlayer/blog";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkMDXsvg } from "remark-mdx-svg";

export default makeSource({
	contentDirPath: "content",
	documentTypes: [Projects, Blog, BlogTranslate],
	mdx: {
		rehypePlugins: [rehypeKatex, rehypeSlug],
		remarkPlugins: [remarkGfm, remarkMath, [remarkMDXsvg, { jsx: true }]],
		cwd: process.cwd(),
		globals: {
			"@mantine/core": {
				varName: "MantineCore",
				type: "cjs",
			},
			"@mantine/hooks": {
				varName: "MantineHooks",
				type: "cjs",
			},
			"@mantine/prism": {
				varName: "MantinePrism",
				type: "cjs",
			},
			markdown: {
				varName: "Markdown",
				type: "cjs",
			},
		},
	},
});
