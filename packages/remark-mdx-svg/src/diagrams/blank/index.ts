import { z } from "zod";
import { load } from "js-yaml";
import { annotations, svg, type Diagram } from "../../utlis/types.js";
import { createSVGDom } from "../../utlis/svgdom.js";
import { importFonts } from "../../utlis/font.js";
import { annotation } from "../../utlis/annotation.js";

export const ZBlank = z.object({
	svg: svg.default({}),
	annotations: annotations,
});

export const blank: Diagram = async (str) => {
	const yaml = typeof str === "string" ? load(str) : str;
	const zodParse = await ZBlank.safeParseAsync(yaml);

	if (!zodParse.success) {
		return {
			success: false,
			message: zodParse.error,
		};
	}

	const { svg, annotations } = zodParse.data;
	const svgDom = createSVGDom(svg.width, svg.height);

	importFonts(svgDom, svg.fonts);
	annotation(svgDom, annotations);

	return {
		success: true,
		output: svgDom.outerHTML,
	};
};
