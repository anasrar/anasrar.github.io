import { Diagram } from "../types";
import { Graphviz } from "./graphviz/main";
import { Pie } from "./pie/main";
import { Pintora } from "./pintora/main";
import { Plot } from "./plot/main";

export const diagrams: Record<string, Diagram> = {
	graphviz: Graphviz,
	pie: Pie,
	plot: Plot,
	pintora: Pintora,
};