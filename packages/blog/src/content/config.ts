import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.date(),
	}),
});

const projectCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.date(),
		links: z
			.object({
				label: z.string(),
				link: z.string(),
			})
			.array()
			.optional()
			.default([]),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection,
};
