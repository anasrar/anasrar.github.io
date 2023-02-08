import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { toString } from "hast-util-to-string";
import { graphviz } from "node-graphviz";
import { Diagram } from "../../types";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import { attrToCSS, writeFileToInspect } from "../../utlis";

export const Graphviz: Diagram = async ({ pre, index, parent, code }) => {
	const output = await graphviz
		.layout(toString(pre), "svg", "dot")
		.then((svg) => ({ success: true as const, svg }))
		.catch((err) => ({
			success: false as const,
			err: err as Error,
		}));
	if (output.success) {
		const root = fromHtml(
			`<div class="language-diagram-graphviz">${output.svg}</div>`,
			{
				space: "svg",
				fragment: true,
			}
		);

		const visitTest: Omit<Element, "children" | "tagName"> = {
			type: "element",
		};

		visit(root, visitTest, (node) => {
			attrToCSS(node, "--diagram-graphviz-");
		});

		const outer = toHtml(root);
		writeFileToInspect("./test/tmp/graphviz.html", outer);

		parent.children.splice(index, 1, ...root.children);
	} else {
		code.properties = {};
		code.children = [
			{
				type: "text",
				value: output.err.message.trim(),
			},
		];
	}
};
