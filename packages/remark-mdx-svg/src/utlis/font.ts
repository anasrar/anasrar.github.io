import { Font } from "./types.js";

export const importFonts = (svg: SVGSVGElement, fonts: Font[]) => {
	const d = svg.ownerDocument.createElementNS(
		"http://www.w3.org/2000/svg",
		"defs"
	);
	d.setAttribute("class", "font-comment");
	svg.appendChild(d);
	for (const { url, onlyWhenDownload } of fonts) {
		if (onlyWhenDownload) {
			const g = svg.ownerDocument.createElementNS(
				"http://www.w3.org/2000/svg",
				"g"
			);
			g.setAttribute("font", url);
			d.appendChild(g);
		} else {
			const s = svg.ownerDocument.createElement("style");
			s.setAttribute("class", "font-comment");
			s.textContent = `@import url(${url})`;
			svg.appendChild(s);
		}
	}
};
