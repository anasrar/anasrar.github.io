import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { compareDesc } from "date-fns";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../consts";

export const GET: APIRoute = async () => {
	const posts = await getCollection("blog");
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts
			.map((post) => ({
				...post.data,
				pubDate: post.data.date,
				link: `/blog/${post.slug}/`,
			}))
			.sort((a, b) => compareDesc(a.date, b.date)),
	});
};