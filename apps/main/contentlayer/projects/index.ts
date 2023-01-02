import {
	defineDocumentType,
	defineNestedType,
} from "contentlayer/source-files";
import BananaSlug from "github-slugger";
import RemoveMarkdown from "remove-markdown";

const slugs = new BananaSlug();

const Link = defineNestedType(() => ({
	name: "Link",
	fields: {
		label: {
			type: "string",
			required: true,
		},
		link: {
			type: "string",
			required: true,
		},
	},
}));

export const Projects = defineDocumentType(() => ({
	name: "Projects",
	filePathPattern: `projects/*/index.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		date: {
			type: "date",
			required: true,
		},
		stack: {
			type: "list",
			of: { type: "string" },
			required: true,
		},
		showStack: {
			type: "number",
			required: false,
			default: 2,
		},
		repository: {
			type: "string",
			required: true,
		},
		links: {
			type: "list",
			of: Link,
			required: true,
		},
	},
	computedFields: {
		url: {
			type: "string",
			resolve: async (doc) => doc._raw.flattenedPath,
		},
		summary: {
			type: "string",
			resolve: async (doc) => {
				const words = RemoveMarkdown(doc.body.raw).replace(
					/(\r\n|\r|\n\n|\n)/gm,
					" "
				);
				return words.length > 160 ? `${words.slice(0, 157)}...` : words;
			},
		},
		toc: {
			type: "list",
			resolve: async (doc) => {
				slugs.reset();
				const result = (doc.body.raw as string)
					.match(/^[#]{2,5} (.+)/gm)
					?.map((c) => {
						const level = c.replace(
							/^([#]{2,5}) (.+)/,
							"$1"
						).length;
						const label = c.replace(/^[#]{2,5} /, "");
						return [level, slugs.slug(label), label];
					});

				// GitHub footnotes
				if (/\[\^[\w\d]+\]/g.test(doc.body.raw)) {
					result?.push([2, "footnote-label", "Footnotes"]);
				}

				return result ?? [];
			},
		},
	},
}));
