import { Element, Parent, Root } from "hast";
import { visit } from "unist-util-visit";
import { diagrams } from "./diagrams/main";

export const rehypeDiagrams = () => {
	const visitTest: Omit<Element, "children" | "properties"> = {
		type: "element",
		tagName: "pre",
	};

	return async (root: Root) => {
		const filtered: [string, Element, number, Parent, Element][] = [];

		visit(root, visitTest, (node, index, parent) => {
			if (
				index &&
				parent &&
				node.children[0]?.type === "element" &&
				node.children[0]?.tagName === "code" &&
				Array.isArray(node.children[0]?.properties?.className) &&
				node.children[0].properties?.className
					.join(" ")
					.includes("language-diagram-")
			) {
				filtered.push([
					node.children[0].properties.className
						.join(" ")
						.replace("language-diagram-", ""),
					node,
					index,
					parent,
					node.children[0],
				]);
			}
		});

		await Promise.all(
			filtered.map(async ([language, pre, index, parent, code]) => {
				if (language in diagrams) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const d = diagrams[language]!;
					return d({
						pre,
						index,
						parent,
						code,
					});
				}
			}),
		);
	};
};

export default rehypeDiagrams;