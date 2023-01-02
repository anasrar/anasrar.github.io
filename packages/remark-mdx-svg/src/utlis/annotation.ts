import roughjs from "roughjs";
import { type RoughSVG } from "roughjs/bin/svg";
import seedrandom from "seedrandom";
import { Annotations } from "./types";
import { select } from "d3";
import { rectPath } from "./path.js";
import svgpath from "svgpath";

const actions = new Map<
	string,
	(svg: SVGElement, rc: RoughSVG, a: Annotations[number]) => void
>([
	[
		"line",
		(svg, rc, a) => {
			if (a.type === "line") {
				const { x1, y1, x2, y2, options } = a;
				options.seed ??= seedrandom
					.alea(`${x1}${y1}${x2}${y2}`)
					.int32();
				svg.appendChild(rc.line(x1, y1, x2, y2, options));
			}
		},
	],
	[
		"rect",
		(svg, rc, a) => {
			if (a.type === "rect") {
				const { x, y, width, height, radius, options } = a;
				options.seed ??= seedrandom
					.alea(`${x}${y}${width}${height}`)
					.int32();
				const d = rectPath({
					x,
					y,
					width,
					height,
					rx: radius,
				});
				svg.appendChild(rc.path(d, options));
			}
		},
	],
	[
		"ellipse",
		(svg, rc, a) => {
			if (a.type === "ellipse") {
				const { x, y, width, height, options } = a;
				options.seed ??= seedrandom
					.alea(`${x}${y}${width}${height}`)
					.int32();
				svg.appendChild(rc.rectangle(x, y, width, height, options));
			}
		},
	],
	[
		"circle",
		(svg, rc, a) => {
			if (a.type === "circle") {
				const { x, y, diameter, options } = a;
				options.seed ??= seedrandom.alea(`${x}${y}${diameter}`).int32();
				svg.appendChild(rc.circle(x, y, diameter, options));
			}
		},
	],
	[
		"arc",
		(svg, rc, a) => {
			if (a.type === "arc") {
				const { x, y, width, height, start, stop, closed, options } = a;
				options.seed ??= seedrandom
					.alea(`${x}${y}${width}${height}`)
					.int32();
				svg.appendChild(
					rc.arc(x, y, width, height, start, stop, closed, options)
				);
			}
		},
	],
	[
		"path",
		(svg, rc, a) => {
			if (a.type === "path") {
				const { x, y, d, scale, options } = a;
				options.seed ??= seedrandom.alea(`${x}${y}${d.length}`).int32();
				let p = svgpath(d).translate(x, y);
				if (Array.isArray(scale)) {
					p = p.scale(scale[0], scale[1]);
				} else {
					p = p.scale(scale);
				}
				svg.appendChild(rc.path(p.rel().toString(), options));
			}
		},
	],
	[
		"text",
		(svg, _rc, a) => {
			if (a.type === "text") {
				const { x, y, value, fill, weight, size, family } = a;
				select(svg)
					.append("text")
					.attr("class", "annotation-text")
					.attr("x", x)
					.attr("y", y)
					.attr("fill", fill)
					.attr("font-weight", weight)
					.attr("font-size", size)
					.attr("font-family", family)
					.text(value);
			}
		},
	],
]);

export const annotation = (svg: SVGSVGElement, annotations: Annotations) => {
	const rc = roughjs.svg(svg);
	for (const a of annotations) {
		const b = actions.get(a.type);
		if (b) {
			b(svg, rc, a);
		}
	}
};
