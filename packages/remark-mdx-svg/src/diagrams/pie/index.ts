import { z } from "zod";
import { load } from "js-yaml";
import { pie as d3pie, select } from "d3";
import { svg, options, type Diagram, annotations } from "../../utlis/types.js";
import { createSVGDom } from "../../utlis/svgdom.js";
import { importFonts } from "../../utlis/font.js";
import roughjs from "roughjs";
import seedrandom from "seedrandom";
import { annotation } from "../../utlis/annotation.js";

export const ZPieData = z.object({
	label: z.string(),
	value: z.number(),
	options: options,
});

export const ZPie = z.object({
	svg: z
		.intersection(
			svg,
			z
				.object({
					pieRadius: z.number().default(140),
					pieX: z.number().default(150),
					pieY: z.number().default(150),
					pieStartAngle: z.number().default(0),
					pieLabelGap: z.number().default(20),
					labelGap: z.number().default(30),
					labelBoxSize: z.number().default(20),
					labelBoxOptions: options,
					labelTextFontWeight: z.string().default("400"),
					labelTextFontSize: z.string().default("16"),
					labelTextFontFamily: z.string().default("sans-serif"),
				})
				.default({})
		)
		.default({}),
	data: ZPieData.array().default([]),
	annotations: annotations,
});

export const pie: Diagram = async (str) => {
	const yaml = typeof str === "string" ? load(str) : str;
	const zodParse = await ZPie.safeParseAsync(yaml);

	if (!zodParse.success) {
		return {
			success: false,
			message: zodParse.error,
		};
	}

	const { svg, data, annotations } = zodParse.data;
	const svgDom = createSVGDom(svg.width, svg.height);
	const rc = roughjs.svg(svgDom);

	importFonts(svgDom, svg.fonts);

	const labelRootGroup = svgDom.ownerDocument.createElementNS(
		"http://www.w3.org/2000/svg",
		"g"
	);
	const labelGroup = svgDom.ownerDocument.createElementNS(
		"http://www.w3.org/2000/svg",
		"g"
	);
	labelRootGroup.appendChild(labelGroup);
	svgDom.appendChild(labelRootGroup);
	select(labelRootGroup)
		.attr("class", "svg-pie-label")
		.attr(
			"transform",
			`translate(${svg.pieX + svg.pieRadius + svg.pieLabelGap}, ${
				svg.height / 2
			})`
		)
		.attr("font-weight", svg.labelTextFontWeight)
		.attr("font-size", svg.labelTextFontSize)
		.attr("font-family", svg.labelTextFontFamily);

	const p = d3pie<z.infer<typeof ZPieData>>()
		.sort(null)
		.value((v) => v.value);
	const pd = p(data);

	for (const [i, piedata] of pd.entries()) {
		piedata.data.options.seed ??= seedrandom.alea(`${i}`).int32();

		svgDom.appendChild(
			rc.arc(
				svg.pieX,
				svg.pieY,
				svg.pieRadius * 2,
				svg.pieRadius * 2,
				piedata.startAngle + svg.pieStartAngle,
				piedata.endAngle + svg.pieStartAngle,
				true,
				piedata.data.options
			)
		);

		labelGroup.appendChild(
			rc.rectangle(
				0,
				i * svg.labelBoxSize +
					svg.labelGap * i -
					(pd.length * svg.labelBoxSize +
						svg.labelBoxSize * (pd.length - 1)) /
						2,
				svg.labelBoxSize,
				svg.labelBoxSize,
				{
					...svg.options,
					...piedata.data.options,
					...svg.labelBoxOptions,
				}
			)
		);

		select(labelGroup)
			.append("text")
			.attr("x", `${svg.labelBoxSize + 10}`)
			.attr(
				"y",
				`${
					i * svg.labelBoxSize +
					svg.labelBoxSize / 2 +
					svg.labelGap * i -
					(pd.length * svg.labelBoxSize +
						svg.labelBoxSize * (pd.length - 1)) /
						2
				}`
			)
			.attr("fill", "currentColor")
			.attr("font-weight", "inherit")
			.attr("font-size", "inherit")
			.attr("font-family", "inherit")
			.attr("dominant-baseline", "middle")
			.text(piedata.data.label);
	}

	annotation(svgDom, annotations);

	return {
		success: true,
		output: svgDom.outerHTML,
	};
};
