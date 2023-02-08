import { Element, Parent } from "hast";

export type Diagram = (input: {
	pre: Element;
	index: number;
	parent: Parent;
	code: Element;
}) => Promise<void>;
