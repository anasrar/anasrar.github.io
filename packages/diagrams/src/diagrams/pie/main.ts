import { toString } from "hast-util-to-string";
import { DotASTNode, parse } from "ts-graphviz/ast";
import { arc, pie, PieArcDatum, select } from "d3";
import { Diagram } from "../../types";
import { createSVG, writeFileToInspect } from "../../utlis";
import { fromHtml } from "hast-util-from-html";

export const Pie: Diagram = async ({ index, parent, code }) => {
	let dot: DotASTNode | undefined;
	try {
		dot = parse(toString(code));
	} catch (err) {
		code.properties = {};
		code.children = [
			{
				type: "text",
				value: (err as Error).message.trim(),
			},
		];
		return;
	}

	const graph = dot.children[0];

	if (graph === undefined || graph.type === "Comment") {
		code.properties = {};
		code.children = [
			{
				type: "text",
				value: "Graph not found.",
			},
		];
		return;
	}

	const attributes: Record<string, string> = {};

	for (const attribute of graph.children) {
		if (attribute.type === "Attribute") {
			attributes[attribute.key.value] = attribute.value.value;
		}
	}

	const startAngle =
		(Number(attributes["startAngle"] ?? "0") * Math.PI) / 180;

	const nodes: Record<
		string,
		{
			attributes: Record<string, string>;
		}
	> = {};

	for (const node of graph.children) {
		if (node.type === "Node") {
			const attributes: Record<string, string> = {};
			for (const attribute of node.children) {
				if (attribute.type === "Attribute") {
					attributes[attribute.key.value] = attribute.value.value;
				}
			}
			nodes[node.id.value] = {
				attributes,
			};
		}
	}

	if (Object.keys(nodes).length === 0) {
		code.properties = {};
		code.children = [
			{
				type: "text",
				value: "Nodes not found.",
			},
		];
		return;
	}

	type Item = {
		label: string;
		value: number;
		attributes: Record<string, string>;
	};

	const items: Item[] = [];

	for (const [label, { attributes: attrs }] of Object.entries(nodes)) {
		if ("value" in attrs) {
			const { value, ...attributes } = attrs;
			items.push({
				label,
				value: Number(value),
				attributes,
			});
		}
	}

	const p = pie<Item>()
		.sort(null)
		.value((v) => v.value);
	const data = p(items);
	const svg = select(createSVG(600, 300));

	const segments = svg
		.append("g")
		.attr("transform", `translate(150, 150)`)
		.selectAll("path")
		.data(data)
		.enter()
		.append("g");

	segments
		.append("title")
		.text((d) => d.data.attributes["label"] ?? d.data.label);

	segments
		.append("path")
		.attr("class", "node")
		.attr(
			"d",
			arc<PieArcDatum<Item>>()
				.startAngle((d) => d.startAngle + startAngle)
				.endAngle((d) => d.endAngle + startAngle)
				.innerRadius(0)
				.outerRadius(145)
		)
		.attr("fill", (d) => d.data.attributes["bgcolor"] ?? "#555")
		.attr(
			"style",
			"stroke: var(--diagram-pie-stroke, #000);" +
				"stroke-width: var(--diagram-pie-stroke-width, 2px);"
		);

	const labelBoxSize = 20;
	const labelGap = 12;

	const label = svg
		.append("g")
		.attr(
			"transform",
			`translate(322, ${
				150 -
				((items.length * labelBoxSize) / 2 +
					((items.length - 1) * labelGap) / 2)
			})`
		)
		.selectAll("path")
		.data(data)
		.enter()
		.append("g")
		.attr(
			"transform",
			(_, i) => `translate(0, ${(labelBoxSize + labelGap) * i})`
		);

	label
		.append("title")
		.text((d) => d.data.attributes["label"] ?? d.data.label);

	label
		.append("rect")
		.attr("width", labelBoxSize)
		.attr("height", labelBoxSize)
		.attr("fill", (d) => d.data.attributes["bgcolor"] ?? "#555")
		.attr(
			"style",
			"stroke: var(--diagram-pie-stroke, #000);" +
				"stroke-width: var(--diagram-pie-stroke-width, 2px);"
		);

	label
		.append("text")
		.attr("class", "label")
		.attr("x", labelBoxSize + labelGap)
		.attr("y", labelBoxSize / 2)
		.attr(
			"style",
			"dominant-baseline: middle;" +
				"fill: var(--diagram-pie-label-fill, currentColor);" +
				"font-family: var(--diagram-pie-label-font-family, inherit);" +
				"font-size: var(--diagram-pie-label-font-size, 14);"
		)
		.text((d) => d.data.attributes["label"] ?? d.data.label);

	const outer = `<div class="language-diagram-pie">${
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		svg.node()!.outerHTML
	}</div>`;

	writeFileToInspect("./test/tmp/pie.html", outer);

	parent.children.splice(
		index,
		1,
		...fromHtml(outer, {
			space: "svg",
			fragment: true,
		}).children
	);
};
