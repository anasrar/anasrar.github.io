import { z } from "zod";
import { load } from "js-yaml";
import { svg, options, type Diagram, annotations } from "../../utlis/types.js";
import { createSVGDom } from "../../utlis/svgdom.js";
import roughjs from "roughjs";
import seedrandom from "seedrandom";
import { annotation } from "../../utlis/annotation.js";

export const ZPathData = z.object({
	d: z.string(),
	options: options,
});

export const ZPath = z.object({
	svg: svg.default({}),
	data: ZPathData.array().default([]),
	annotations: annotations,
});

export const path: Diagram = async (str) => {
	const yaml = typeof str === "string" ? load(str) : str;
	const zodParse = await ZPath.safeParseAsync(yaml);

	if (!zodParse.success) {
		return {
			success: false,
			message: zodParse.error,
		};
	}

	const { svg, data, annotations } = zodParse.data;
	const svgDom = createSVGDom(svg.width, svg.height);
	const rc = roughjs.svg(svgDom);

	for (const p of data) {
		p.options.seed ??= seedrandom.alea(`${p.d.length}`).int32();
		const r = rc.path(p.d, {
			...svg.options,
			...p.options,
		});
		svgDom.appendChild(r);
	}

	annotation(svgDom, annotations);

	return {
		success: true,
		output: svgDom.outerHTML,
	};
};
