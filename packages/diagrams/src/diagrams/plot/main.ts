import {
	axisBottom,
	axisLeft,
	curveBasis,
	CurveFactory,
	curveMonotoneX,
	curveStepAfter,
	line,
	range,
	scaleLinear,
	select,
} from "d3";
import { attrToCSS, createSVG, getAttr, writeFileToInspect } from "../../utlis";
import { toString } from "hast-util-to-string";
import { DotASTNode, parse } from "ts-graphviz/ast";
import { Parser } from "expr-eval";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import { Diagram } from "../../types";

const curves: Record<string, CurveFactory> = {
	basis: curveBasis,
	step: curveStepAfter,
	monotone: curveMonotoneX,
};

export const Plot: Diagram = async ({ index, parent, code }) => {
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

	const id = graph.id?.value ?? "G";

	const attributes: Record<string, string> = {};

	for (const attribute of graph.children) {
		if (attribute.type === "Attribute") {
			attributes[attribute.key.value] = attribute.value.value;
		}
	}

	const width = Number(getAttr(attributes, "width", "550"));
	const height = Number(getAttr(attributes, "height", "350"));
	const padding = 14;
	const xHeight = 26;
	const yWidth = 26;
	const xDomainStart = Number(getAttr(attributes, "xDomainStart", "-3"));
	const xDomainEnd = Number(getAttr(attributes, "xDomainEnd", "3"));
	const xTicks = Number(getAttr(attributes, "xTicks", "6"));
	const yDomainStart = Number(getAttr(attributes, "yDomainStart", "-3"));
	const yDomainEnd = Number(getAttr(attributes, "yDomainEnd", "3"));
	const yTicks = Number(getAttr(attributes, "yTicks", "6"));
	const svg = select(createSVG(width, height));

	const xScale = scaleLinear()
		.domain([xDomainStart, xDomainEnd])
		.range([0, width - yWidth - padding * 2]);
	const xAxis = axisBottom(xScale).tickSize(0).tickPadding(14).ticks(xTicks);

	const yScale = scaleLinear()
		.domain([yDomainEnd, yDomainStart])
		.range([0, height - xHeight - padding * 2]);
	const yAxis = axisLeft(yScale).tickSize(0).tickPadding(14).ticks(yTicks);

	const l = line()
		.x((d) => xScale(d[0]))
		.y((d) => yScale(d[1]));

	// Mask content
	svg.append("defs")
		.append("clipPath")
		.attr("id", `mask-content-${id}`)
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width - yWidth - padding * 2 + 1)
		.attr("height", height - xHeight - padding * 2 + 1);

	const hints = svg
		.append("g")
		.attr("class", "hints")
		.attr("transform", `translate(${padding + yWidth}, ${padding})`)
		.attr(
			"style",
			`shape-rendering: crispEdges; clip-path: url(#mask-content-${id});`
		);

	const grid = hints
		.append("g")
		.attr("class", "grid")
		.attr(
			"style",
			"stroke: var(--diagram-plot-grid-stroke, rgba(0, 0, 0, 0.2)); stroke-width: var(--diagram-plot-grid-stroke-width, 1px);"
		);

	// X grid
	grid.append("g")
		.attr("class", "x-grid")
		.selectAll("line")
		.data(xScale.ticks(xTicks))
		.enter()
		.append("line")
		.attr("x1", (d) => xScale(d))
		.attr("y1", "0")
		.attr("x2", (d) => xScale(d))
		.attr("y2", `${height - xHeight - padding * 2}`);

	// Y grid
	grid.append("g")
		.attr("class", "y-grid")
		.selectAll("line")
		.data(yScale.ticks(yTicks))
		.enter()
		.append("line")
		.attr("x1", "0")
		.attr("y1", (d) => yScale(d))
		.attr("x2", `${width - yWidth - padding * 2}`)
		.attr("y1", (d) => yScale(d))
		.attr("y2", (d) => yScale(d));

	const origin = hints.append("g").attr("class", "origin");

	// X origin
	origin
		.append("g")
		.attr("class", "x-origin")
		.selectAll("path")
		.data<[number, number][]>([
			[
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				[xScale.domain()[0]!, 0],
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				[xScale.domain()[1]!, 0],
			],
		])
		.enter()
		.append("path")
		.attr("style", "stroke: var(--diagram-plot-origin-x-stroke, red)")
		.attr("d", l);

	// Y origin
	origin
		.append("g")
		.attr("class", "y-origin")
		.selectAll("path")
		.data<[number, number][]>([
			[
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				[0, yScale.domain()[0]!],
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				[0, yScale.domain()[1]!],
			],
		])
		.enter()
		.append("path")
		.attr("style", "stroke: var(--diagram-plot-origin-y-stroke, green)")
		.attr("d", l);

	const axis = svg
		.append("g")
		.attr("class", "axis")
		.attr("style", "shape-rendering: crispEdges;");

	// X axis
	axis.append("g")
		.attr("class", "x-axis")
		.attr(
			"transform",
			`translate(${padding + yWidth}, ${height - padding - xHeight})`
		)
		.call(xAxis);

	// Y axis
	axis.append("g")
		.attr("class", "y-axis")
		.attr("transform", `translate(${padding + yWidth}, ${padding})`)
		.call(yAxis);

	const content = svg
		.append("g")
		.attr("class", "content")
		.attr("transform", `translate(${padding + yWidth}, ${padding})`)
		.attr("style", `clip-path: url(#mask-content-${id});`);

	const parser = new Parser();

	for (const node of graph.children) {
		if (node.type !== "Node") {
			continue;
		}

		const attributes: Record<string, string> = {};
		for (const attribute of node.children) {
			if (attribute.type === "Attribute") {
				attributes[attribute.key.value] = attribute.value.value;
			}
		}

		if (!("fn" in attributes) || attributes["fn"] === undefined) {
			continue;
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const fn = parser.parse(attributes["fn"]!);
		const step = Number(getAttr(attributes, "step", "1"));
		const curve = getAttr(attributes, "curve", "basis");
		const color = getAttr(attributes, "color", "blue");

		content
			.append("path")
			.attr("id", `${node.id.value}-plot`)
			.attr("class", "plot")
			.datum(
				range(xDomainStart, xDomainEnd + step + step, step)
					.map<[number, number]>((x) => [x, fn.evaluate({ x })])
					.filter(([, y]) => {
						return y > xDomainStart - 0.5 && y < xDomainEnd + 0.5;
					})
			)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.attr("d", l.curve(curve in curves ? curves[curve]! : curveBasis))
			.attr("fill", "none")
			.attr(
				"style",
				`stroke: var(--diagram-plot-stroke, ${color}); stroke-width: var(--diagram-plot-stroke-width, 3px)`
			);
	}

	const root = fromHtml(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		`<div class="language-diagram-plot">${svg.node()!.outerHTML}</div>`,
		{
			space: "svg",
			fragment: true,
		}
	);

	const visitTest: Omit<Element, "children" | "tagName"> = {
		type: "element",
	};

	visit(root, visitTest, (node) => {
		attrToCSS(node, "--diagram-plot-");
	});

	const outer = toHtml(root);

	writeFileToInspect("./test/tmp/plot.html", outer);

	parent.children.splice(index, 1, ...root.children);
};
