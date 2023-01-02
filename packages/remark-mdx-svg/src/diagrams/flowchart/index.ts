import { z } from "zod";
import { load } from "js-yaml";
import { svg, options, type Diagram, annotations } from "../../utlis/types.js";
import {
	coordCenter,
	coordQuad,
	coordGreedy,
	coordSimplex,
	dagStratify,
	decrossOpt,
	sugiyama,
} from "d3-dag";
import { createSVGDom } from "../../utlis/svgdom.js";
import { curveMonotoneY, line, select } from "d3";
import roughjs from "roughjs";
import { importFonts } from "../../utlis/font.js";
import { Point } from "d3-dag/dist/dag/index.js";
import { rectPath } from "../../utlis/path.js";
import seedrandom from "seedrandom";
import { annotation } from "../../utlis/annotation.js";

const coords = new Map([
	["center", coordCenter],
	["quad", coordQuad],
	["greedy", coordGreedy],
	["simplex", coordSimplex],
]);

export const ZFlowchartData = z.object({
	id: z.string(),
	label: z.string().optional(),
	parent: z.string().array().default([]),
	fill: z.string().optional(),
	options: options,
});

export const ZFlowchart = z.object({
	svg: z
		.intersection(
			svg,
			z
				.object({
					layoutCoord: z.string().default("center"),
					nodeWidth: z.number().default(50),
					nodeHeight: z.number().default(50),
					nodeRadius: z.number().default(10),
					nodeGap: z.number().default(10),
					nodeOptions: options,
					lineOptions: options,
					labelTextFill: z.string().default("currentColor"),
					labelTextFontWeight: z.string().default("400"),
					labelTextFontSize: z.string().default("16"),
					labelTextFontFamily: z.string().default("sans-serif"),
				})
				.default({})
		)
		.default({}),
	data: ZFlowchartData.array().default([]),
	annotations: annotations,
});

export const flowchart: Diagram = async (str) => {
	const yaml = typeof str === "string" ? load(str) : str;
	const zodParse = await ZFlowchart.safeParseAsync(yaml);

	if (!zodParse.success) {
		return {
			success: false,
			message: zodParse.error,
		};
	}

	const { svg, data, annotations } = zodParse.data;

	const dag = dagStratify().parentIds(
		({ parent }: z.infer<typeof ZFlowchartData>) => parent
	)(data);

	const c = coords.get(svg.layoutCoord);
	const layout = sugiyama()
		.decross(decrossOpt())
		.coord(c ? c() : coordGreedy())
		.nodeSize(() => [
			svg.nodeWidth + svg.nodeGap,
			svg.nodeHeight + svg.nodeGap,
		]);

	const { width, height } = layout(dag);
	const svgDom = createSVGDom(
		Math.max(width, svg.width),
		Math.max(height, svg.height)
	);
	const rc = roughjs.svg(svgDom);

	importFonts(svgDom, svg.fonts);

	const l = line<Point>()
		.curve(curveMonotoneY)
		.x((d) => d.x)
		.y((d) => d.y);

	// edges
	select(svgDom)
		.append("g")
		.selectAll("path")
		.data(dag.links())
		.enter()
		.append(({ points }) => {
			const r = rc.path(l(points) ?? "", {
				...{
					seed: seedrandom
						.alea(points.reduce((a, c) => `${a}${c}`, ""))
						.int32(),
				},
				...svg.lineOptions,
			});

			return r;
		});

	// nodes
	const nodes = select(svgDom)
		.append("g")
		.attr("class", "flowchart-node")
		.attr("font-weight", svg.labelTextFontWeight)
		.attr("font-size", svg.labelTextFontSize)
		.attr("font-family", svg.labelTextFontFamily)
		.selectAll("g")
		.data(dag.descendants())
		.enter()
		.append("g")
		.attr("transform", ({ x, y }) => `translate(${x}, ${y})`);

	nodes.append(({ data }) => {
		const d = rectPath({
			x: -(svg.nodeWidth / 2),
			y: -(svg.nodeHeight / 2),
			rx: svg.nodeRadius,
			width: svg.nodeWidth,
			height: svg.nodeHeight,
		});
		data.options.seed ??= seedrandom.alea(data.id).int32();
		const r = rc.path(d, {
			...svg.nodeOptions,
			...data.options,
		});

		return r;
	});

	nodes
		.append("text")
		.attr("fill", (d) => d.data.fill ?? svg.labelTextFill)
		.attr("font-weight", "inherit")
		.attr("font-size", "inherit")
		.attr("font-family", "inherit")
		.attr("text-anchor", "middle")
		.attr("dominant-baseline", "middle")
		.text((d) => d.data.label ?? d.data.id);

	annotation(svgDom, annotations);

	return {
		success: true,
		output: svgDom.outerHTML,
	};
};
