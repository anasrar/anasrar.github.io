import { writeFile } from "node:fs/promises";
import { Element } from "hast";
import { JSDOM } from "jsdom";

export const getAttr = (
	attrs: Record<string, string>,
	key: string,
	def: string
) => {
	// prettier-ignore
	return key in attrs && attrs[key] !== undefined && attrs[key] !== "" ?
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		attrs[key]!
		: def;
};

export const createSVG = (width: number, height: number) => {
	const j = new JSDOM(
		`<html><head></head><body><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"></svg></body></html>`,
		{ pretendToBeVisual: true }
	);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return j.window.document.querySelector("svg")!;
};

export const writeFileToInspect = async (path: string, content: string) => {
	if (process.env.INSPECT_FILE !== "false") await writeFile(path, content);
};

const attrTransform: Record<
	string,
	{ name: string; transform: null | ((value: string) => string) }
> = {
	textAnchor: {
		name: "text-anchor",
		transform: null,
	},
	fontFamily: {
		name: "font-family",
		transform: null,
	},
	fontSize: {
		name: "font-size",
		transform: (v) => {
			return /^\d+(?:\.\d+)?$/.test(v) ? `${v}px` : v;
		},
	},
	strokeWidth: {
		name: "stroke-width",
		transform: null,
	},
};

export const attrToCSS = (node: Element, prefix: string) => {
	if (node.properties === undefined) {
		return;
	}

	let style = "";
	const keys = Object.keys(node.properties);

	for (const key of keys) {
		if (key in attrTransform && typeof node.properties[key] === "string") {
			const v = node.properties[key] as string;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const k = attrTransform[key]!;
			style += `${k.name}: var(${prefix}${k.name}, ${
				k.transform === null ? v : k.transform(v)
			});`;
			delete node.properties[key];
		}
	}

	if (style === "") {
		return;
	}

	if (node.properties.style) {
		node.properties.style += ";" + style;
		return;
	}

	node.properties.style = style;
};
