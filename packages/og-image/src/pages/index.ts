import type { APIContext } from "astro";
import { html } from "satori-html";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export const get = async (context: APIContext) => {
	const title = context.url.searchParams.get("title") ?? "?";
	// const date = Number(context.url.searchParams.get("date")) ?? 0;

	const template = html(`
<div style="position: relative; display: flex; flex-flow: column nowrap; justify-content: center; align-items: flex-start; width: 1200px; height: 630px; color: #dee2e6; background: #101113">
  <div style="position: absolute; bottom: 40px; left: 40px; color: #868e96; font-weight: 500; font-size: 24px;">
    anasrar.github.io
  </div>
  <div style="width: 656px; margin: 0 40px; font-weight: 600; font-size: 72px; line-height: 110%">
  ${title}
  </div>
</div>
`);

	const svg = await satori(template as Parameters<typeof satori>[0], {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Inter",
				data: await (
					await fetch(
						"https://anasrar.github.io/_astro/IBMPlexMono-Medium.e61d37ab.ttf"
					)
				).arrayBuffer(),
				weight: 500,
				style: "normal",
			},
			{
				name: "Inter",
				data: await (
					await fetch(
						"https://anasrar.github.io/_astro/IBMPlexMono-Bold.d3cfb275.ttf"
					)
				).arrayBuffer(),
				weight: 600,
				style: "normal",
			},
		],
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: "width",
			value: 1200,
		},
	});

	const resvgData = resvg.render();
	const buffer = resvgData.asPng();

	return new Response(buffer, {
		status: 200,
		headers: {
			"Content-Type": "image/png",
		},
	});
};