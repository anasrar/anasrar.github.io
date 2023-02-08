import { readdir, readFile } from "node:fs/promises";
import { parse } from "node:path";
import { describe, expect, it } from "vitest";
import { Root } from "hast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";
import { toHtml } from "hast-util-to-html";
import { format } from "prettier";
import rehypeDiagrams from "../src/main";

const transform = async (mock: string) => {
	const mdast = fromMarkdown(mock);
	const hast = toHast(mdast) as Root;
	await rehypeDiagrams()(hast);
	const html = toHtml(hast);

	return format(html, {
		filepath: `mock.html`,
	});
};

describe("Diagrams", async () => {
	const files = await readdir("./test/mock");

	for (const file of files) {
		const mock = await readFile(`./test/mock/${file}`, {
			encoding: "utf8",
		});
		const snapshot = await readFile(
			`./test/snapshot/${parse(file).name}.html`,
			{
				encoding: "utf8",
			}
		);
		const t = await transform(mock);

		it(file, () => {
			expect(t).toStrictEqual(
				format(snapshot, {
					filepath: `snapshot.html`,
				})
			);
		});
	}
});
