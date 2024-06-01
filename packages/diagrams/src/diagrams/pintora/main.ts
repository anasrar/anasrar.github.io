import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { toString } from "hast-util-to-string";
import { render } from "@pintora/cli";
import { Diagram } from "../../types";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import { attrToCSS, writeFileToInspect } from "../../utlis";

export const Pintora: Diagram = async ({ pre, index, parent, code }) => {
	const output = await render({
		code: toString(pre),
		mimeType: "image/svg+xml",
		width: 1000,
		backgroundColor: "transparent",
	})
		.then((svg) => ({ success: true as const, svg: svg }))
		.catch((err) => ({
			success: false as const,
			err: err as Error,
		}));
	if (output.success) {
		const svg = await output.svg;
		const root = fromHtml(
			`<div class="language-diagram-pintora">${svg}</div>`,
			{
				space: "svg",
				fragment: true,
			},
		);

		const visitTest: Omit<Element, "children" | "tagName" | "properties"> =
			{
				type: "element",
			};

		visit(root, visitTest, (node) => {
			attrToCSS(node, "--diagram-pintora-");
		});

		const visitTestSvg: Omit<Element, "children" | "properties"> = {
			type: "element",
			tagName: "svg",
		};
		visit(root, visitTestSvg, (node) => {
			const { width, height } = node.properties;
			node.properties.viewBox = `0 0 ${width} ${height}`;
		});

		const outer = toHtml(root);
		writeFileToInspect("./test/tmp/pintora.html", outer);

		parent.children.splice(index, 1, ...root.children);
	} else {
		code.properties = {};
		code.children = [
			{
				type: "text",
				value: "Error parse pintora syntax",
			},
		];
	}
};