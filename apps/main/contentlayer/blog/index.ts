import {
	ComputedFields,
	defineDocumentType,
	FieldDefs,
} from "contentlayer/source-files";
import BananaSlug from "github-slugger";
import { readdir } from "node:fs/promises";
import { format, parseISO } from "date-fns";
import readingTime from "reading-time";
import RemoveMarkdown from "remove-markdown";
import { locales, Locale } from "../../i18n/locales";
import { Author, authors } from "../../authors";

const slugs = new BananaSlug();

const fields: FieldDefs = {
	title: {
		type: "string",
		required: true,
	},
	date: {
		type: "date",
		required: true,
	},
	lastmod: {
		type: "date",
		required: false,
	},
	tags: {
		type: "list",
		of: { type: "string" },
		required: true,
	},
	showTags: {
		type: "number",
		required: false,
		default: 2,
	},
	authors: {
		type: "list",
		of: { type: "string" },
		required: true,
	},
	ogImage: {
		type: "json",
		required: true,
	},
};

const computedFields: ComputedFields = {
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
	dataAuthors: {
		type: "json",
		resolve: async (doc) => {
			return (doc.authors._array as string[]).reduce<
				Record<string, Author>
			>((a, c) => {
				const author = authors.get(c);
				if (author) {
					a[c] = author;
				}
				return a;
			}, {});
		},
	},
	formattedDate: {
		type: "string",
		resolve: async (doc) => {
			const segments = doc._raw.sourceFileDir.split("/");
			const translation = segments.length === 3;
			const code = translation ? segments.at(-1) : "en-US";
			const locale = locales.get(code!);
			if (locale) return format(parseISO(doc.date), locale.date, {});
			return `${doc.date}`;
		},
	},
	formattedLastmod: {
		type: "string",
		resolve: async (doc) => {
			if (!doc.lastmod) return "";
			const segments = doc._raw.sourceFileDir.split("/");
			const translation = segments.length === 3;
			const code = translation ? segments.at(-1) : "en-US";
			const locale = locales.get(code!);
			if (locale) return format(parseISO(doc.lastmod), locale.lastmod);
			return `${doc.lastmod}`;
		},
	},
	estimate: {
		type: "number",
		resolve: async (doc) => {
			const t = ~~readingTime(doc.body.raw).minutes;
			const segments = doc._raw.sourceFileDir.split("/");
			const translation = segments.length === 3;
			const code = translation ? segments.at(-1) : "en-US";
			const locale = locales.get(code!);
			if (locale) return locale.estimate.replace(/\{\}/gm, `${t}`);
			return `${t}`;
		},
	},
	toc: {
		type: "list",
		resolve: async (doc) => {
			slugs.reset();
			const result = (doc.body.raw as string)
				.match(/^[#]{2,5} (.+)/gm)
				?.map((c) => {
					const level = c.replace(/^([#]{2,5}) (.+)/, "$1").length;
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
	locale: {
		type: "string",
		resolve: async (doc) => {
			const segments = doc._raw.sourceFileDir.split("/");
			const translation = segments.length === 3;
			if (!translation) return "en-US";
			return segments.at(-1);
		},
	},
	localeAlternate: {
		type: "json",
		resolve: async (doc) => {
			const segments = doc._raw.sourceFileDir.split("/");
			const translation = segments.length === 3;
			const path = segments
				.slice(0, translation ? 2 : undefined)
				.join("/");
			const result: Record<string, Locale> = {};
			result["en-US"] = structuredClone(locales.get("en-US")!);
			result["en-US"].url = `/${path}/`;
			(await readdir("content/" + path, { withFileTypes: true }))
				.filter((d) => d.isDirectory())
				.reduce((a, c) => {
					const locale = locales.get(c.name);
					if (locale) {
						a[c.name] = structuredClone(locale);
						a[c.name].url = `/${path}/${c.name}/`;
					}
					return a;
				}, result);
			return result;
		},
	},
};

export const Blog = defineDocumentType(() => ({
	name: "Blog",
	filePathPattern: `blog/*/index.mdx`,
	contentType: "mdx",
	fields,
	computedFields,
}));

export const BlogTranslate = defineDocumentType(() => ({
	name: "BlogTranslate",
	filePathPattern: `blog/*/*/index.mdx`,
	contentType: "mdx",
	fields,
	computedFields,
}));
