import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxjs } from "micromark-extension-mdxjs";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";

export const mdx2ast = (str: string) => {
	return fromMarkdown(str, {
		extensions: [mdxjs()],
		mdastExtensions: [mdxFromMarkdown()],
	});
};

export const ast2mdx = (root: ReturnType<typeof fromMarkdown>) => {
	return toMarkdown(root, {
		extensions: [mdxToMarkdown()],
	});
};
