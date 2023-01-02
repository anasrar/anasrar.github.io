import { basePath } from "../next.config.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { compareDesc } from "date-fns";
import {
	allBlogs,
	allBlogTranslates,
} from "../.contentlayer/generated/index.mjs";
import RSS from "rss";

const feed = new RSS({
	title: "Anas Rin",
	description: "Blog",
	feed_url: `${process.env.SITE_URL}${basePath}/rss/blog.xml`,
	site_url: `${process.env.SITE_URL}${basePath}/blog/`,
	image_url: "https://avatars.githubusercontent.com/u/38805204",
	copyright: "CC BY 4.0",
	language: "en-US",
	ttl: 1440,
});

const posts = [...allBlogs, ...allBlogTranslates].sort((a, b) => {
	return compareDesc(new Date(a.date), new Date(b.date));
});

for (const post of posts) {
	feed.item({
		title: post.title,
		description: post.summary,
		url: `${process.env.SITE_URL}${basePath}/${post.url}/`,
		categories: post.tags,
		author: post.authors.join(", "),
		date: post.date,
	});
}

await mkdir(`./public/rss/`, {
	recursive: true,
});
await writeFile(`./public/rss/blog.xml`, feed.xml({ indent: true }));
