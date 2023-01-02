import { readFile, writeFile, mkdir } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import {
	allBlogs,
	allBlogTranslates,
} from "../.contentlayer/generated/index.mjs";
import { blank } from "remark-mdx-svg/dist/diagrams/blank/index.js";
import { htmlReactElement } from "remark-mdx-svg/dist/utlis/htmlreactelement.js";

const posts = [...allBlogs, ...allBlogTranslates];

for (const post of posts) {
	const check = await blank(post.ogImage);
	let svg = "";
	if (check.success) {
		svg = check.output;
	} else {
		console.error(check.message);
	}

	const authors = Object.entries(post.dataAuthors).reduce(
		(result, [name, props]) => {
			result += `<img src="${props.image}" alt="${name}" style="margin-left: 4px; border-radius: 14px;" width="28" height="28">`;
			return result;
		},
		""
	);
	const template =
		`<div style="display: flex; flex-flow: column nowrap; justify-content: flex-end; align-items: stretch; width: 600px; height: 315px; color: #f8f9fa; background: rgb(16, 17, 19); padding: 0 16px 16px 16px; font-family: Open Sauce Two;">` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center; flex: 1 1 0%;">` +
		`<div style="display: flex; flex-flow: row nowrap; margin: 12px;">` +
		`${svg}` +
		`</div>` +
		`</div>` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: flex-start; align-items: center; margin-bottom: 12px; font-size: 26px; font-weight: 700;">` +
		`${post.title}` +
		`</div>` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center;">` +
		`<div style="display: flex; flex-flow: row nowrap; color: #909296; font-weight: 600; font-size: 12px;">` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;">` +
		`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#909296" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
		`<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>` +
		`<rect x="4" y="5" width="16" height="16" rx="2"></rect>` +
		`<line x1="16" y1="3" x2="16" y2="7"></line>` +
		`<line x1="8" y1="3" x2="8" y2="7"></line>` +
		`<line x1="4" y1="11" x2="20" y2="11"></line>` +
		`<rect x="8" y="15" width="2" height="2"></rect>` +
		`</svg>` +
		`<span style="margin-left: 8px;">` +
		`${post.formattedDate}` +
		`</span>` +
		`</div>` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center; margin-left: 16px;">` +
		`<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="#909296" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
		`<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>` +
		`<circle cx="12" cy="12" r="9"></circle>` +
		`<polyline points="12 7 12 12 15 15"></polyline>` +
		`</svg>` +
		`<span style="margin-left: 8px;">` +
		`${post.estimate}` +
		`</span>` +
		`</div>` +
		`</div>` +
		`<div style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;">` +
		`${authors}` +
		`</div>` +
		`</div>` +
		`</div>`;
	svg = await satori(htmlReactElement(template), {
		width: 600,
		height: 315,
		fonts: [
			{
				name: "Open Sauce Two",
				data: await readFile(
					"./fonts/OpenSauceTwo/OpenSauceTwo-Bold.ttf"
				),
				weight: 700,
				style: "normal",
			},
			{
				name: "Open Sauce Two",
				data: await readFile(
					"./fonts/OpenSauceTwo/OpenSauceTwo-SemiBold.ttf"
				),
				weight: 600,
				style: "normal",
			},
		],
	});

	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	await mkdir(`./public/assets/${post.url}/`, {
		recursive: true,
	});
	await writeFile(`./public/assets/${post.url}/og.png`, pngBuffer);
}
