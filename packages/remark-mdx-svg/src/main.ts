import { Parent, visit } from "unist-util-visit";
import { d } from "./diagrams/index.js";
import { htmlToJsx } from "html-to-jsx-transform";
import { mdx2ast } from "./utlis/mdxast.js";
import { type Code } from "./utlis/types.js";

export const remarkMDXsvg =
	({ jsx = true }) =>
	async (tree: Parameters<typeof visit>[0]) => {
		const ns: [Code, number, Parent][] = [];
		visit(
			tree,
			{ type: "code", lang: "yaml" },
			(node: Code, index, parent) => {
				if (d.has(node.meta ?? "")) {
					ns.push([node, index, parent]);
				}
			}
		);

		await Promise.all(
			ns.map(async ([node, index, parent]) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const p = await d.get(node.meta ?? "")!(node.value);
				if (!p.success) {
					console.error(p.message);
					return;
				}
				const result = mdx2ast(jsx ? htmlToJsx(p.output) : p.output);
				parent.children[index] = result;
			})
		);
	};
