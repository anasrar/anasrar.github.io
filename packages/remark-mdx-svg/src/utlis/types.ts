import { z, ZodError } from "zod";

export type Parent = {
	type: "root";
	children: unknown[];
};

export type Code = {
	type: "code";
	lang?: string;
	meta?: string;
	value: string;
};

export const options = z
	.object({
		maxRandomnessOffset: z.number().optional(),
		roughness: z.number().optional(),
		bowing: z.number().optional(),
		stroke: z.string().optional(),
		strokeWidth: z.number().optional(),
		curveFitting: z.number().optional(),
		curveTightness: z.number().optional(),
		curveStepCount: z.number().optional(),
		fill: z.string().optional(),
		fillStyle: z.string().optional(),
		fillWeight: z.number().optional(),
		hachureAngle: z.number().optional(),
		hachureGap: z.number().optional(),
		simplification: z.number().optional(),
		dashOffset: z.number().optional(),
		dashGap: z.number().optional(),
		zigzagOffset: z.number().optional(),
		seed: z.number().optional(),
		strokeLineDash: z.number().array().optional(),
		strokeLineDashOffset: z.number().optional(),
		fillLineDash: z.number().array().optional(),
		fillLineDashOffset: z.number().optional(),
		disableMultiStroke: z.boolean().optional(),
		disableMultiStrokeFill: z.boolean().optional(),
		preserveVertices: z.boolean().optional(),
		fixedDecimalPlaceDigits: z.number().optional(),
	})
	.default({});

export type Options = z.infer<typeof options>;

export const font = z.object({
	url: z.string(),
	onlyWhenDownload: z.boolean().default(true),
});

export type Font = z.infer<typeof font>;

export const svg = z.object({
	width: z.number().default(600),
	height: z.number().default(300),
	fonts: font.array().default([]),
	options: options,
});

export type Diagram = (
	str: string | unknown
) => Promise<
	{ success: true; output: string } | { success: false; message: ZodError }
>;

export const annotationLine = z.object({
	type: z.enum(["line"]).default("line"),
	x1: z.number().default(0),
	y1: z.number().default(0),
	x2: z.number().default(10),
	y2: z.number().default(10),
	options: options,
});

export type AnnotationLine = z.infer<typeof annotationLine>;

export const annotationRect = z.object({
	type: z.enum(["rect"]).default("rect"),
	x: z.number().default(0),
	y: z.number().default(0),
	width: z.number().default(10),
	height: z.number().default(10),
	radius: z.number().default(0),
	options: options,
});

export type AnnotationRect = z.infer<typeof annotationRect>;

export const annotationEllipse = z.object({
	type: z.enum(["ellipse"]).default("ellipse"),
	x: z.number().default(0),
	y: z.number().default(0),
	width: z.number().default(10),
	height: z.number().default(10),
	options: options,
});

export type AnnotationEllipse = z.infer<typeof annotationEllipse>;

export const annotationCircle = z.object({
	type: z.enum(["circle"]).default("circle"),
	x: z.number().default(0),
	y: z.number().default(0),
	diameter: z.number().default(10),
	options: options,
});

export type AnnotationCircle = z.infer<typeof annotationCircle>;

export const annotationArc = z.object({
	type: z.enum(["arc"]).default("arc"),
	x: z.number().default(0),
	y: z.number().default(0),
	width: z.number().default(10),
	height: z.number().default(10),
	start: z.number().default(0),
	stop: z.number().default(2),
	closed: z.boolean().default(false),
	options: options,
});

export type AnnotationArc = z.infer<typeof annotationArc>;

export const annotationPath = z.object({
	type: z.enum(["path"]).default("path"),
	x: z.number().default(0),
	y: z.number().default(0),
	d: z.string().default(""),
	scale: z.union([z.number().default(1), z.number().array().default([1, 1])]),
	options: options,
});

export type AnnotationPath = z.infer<typeof annotationPath>;

export const annotationText = z.object({
	type: z.enum(["text"]).default("text"),
	x: z.number().default(0),
	y: z.number().default(0),
	value: z.string().default(""),
	fill: z.string().default("inherit"),
	weight: z.string().default("inherit"),
	size: z.string().default("inherit"),
	family: z.string().default("inherit"),
	options: options,
});

export type annotationText = z.infer<typeof annotationText>;

export const annotations = z
	.union([
		annotationLine,
		annotationRect,
		annotationEllipse,
		annotationCircle,
		annotationArc,
		annotationPath,
		annotationText,
	])
	.array()
	.default([]);

export type Annotations = z.infer<typeof annotations>;
