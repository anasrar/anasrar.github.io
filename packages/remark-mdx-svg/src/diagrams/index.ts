import { Diagram } from "../utlis/types.js";
import { blank } from "./blank/index.js";
import { pie } from "./pie/index.js";
import { flowchart } from "./flowchart/index.js";

export const d: Map<string, Diagram> = new Map([
	["blank", blank],
	["pie", pie],
	["flowchart", flowchart],
]);

export const parser = async (diagram: string, str: string) => {
	return await d.get(diagram)?.call(null, str);
};
