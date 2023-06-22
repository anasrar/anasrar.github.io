import type { APIContext } from "astro";
import { html } from "satori-html";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const BACKGROUND_URL: string[] = [
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922133.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922146.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922127.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-texture_23-2148983917.jpg",
	"https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-714.jpg",
	"https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-713.jpg",
	"https://img.freepik.com/free-vector/dynamic-gradient-grainy-wallpaper_23-2148964508.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922139.jpg",
	"https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-716.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922143.jpg",
	"https://img.freepik.com/free-vector/red-modern-gradient-background-vector-with-blue-black_53876-128311.jpg",
	"https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-711.jpg",
	"https://img.freepik.com/free-vector/gradient-colorful-grainy-dynamic-background_52683-101908.jpg",
	"https://img.freepik.com/free-photo/close-up-film-texture-details_23-2149368420.jpg",
	"https://img.freepik.com/free-vector/colorful-modern-gradient-background-vector-red-green_53876-128307.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149928515.jpg",
	"https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149928512.jpg",
];

export const get = async (context: APIContext) => {
	const bg =
		BACKGROUND_URL[
			(Number(context.url.searchParams.get("bg")) ?? 0) %
				BACKGROUND_URL.length
		];
	const title = context.url.searchParams.get("title") ?? "title";
	const authorImg =
		context.url.searchParams.get("authorImg") ??
		"https://avatars.githubusercontent.com/u/38805204";
	const authorName =
		context.url.searchParams.get("authorName") ?? "authorName";
	const website = context.url.searchParams.get("website") ?? "website";

	const template = html(`
<div style="position: relative; display: flex; flex-flow: column nowrap; align-items: stretch; width: 1200px; height: 630px; padding: 112px; color: #dee2e6; background: rgba(20, 21, 23, 1);">
  <img style="position: absolute; top: 0; left: 0; display: flex; width: 1200px; height: 630px; object-fit: cover;" src="${bg}"/>
  <div style="position: absolute; bottom: 16px; right: 16px; display: flex; color: #ffffff66; font-weight: 500; font-size: 18px; line-height: 120%">
    Background by Freepik
  </div>
  <div style="display: flex; flex: 1; flex-flow: column nowrap; justify-content: space-between; border: 2px solid rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 20px; background: rgba(20, 21, 23, 0.92); box-shadow: 0 0 0 2px #000, 0 0 20px 4px #000000bf; backdrop-filter: blur(10px);">
    <div style="font-weight: 600; font-size: 60px; line-height: 120%;">
      ${title}
    </div>
    <div style="display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: flex-end;">
      <div style="display: flex; flex-flow: row nowrap; align-items: center; gap: 16px; color: #adb5bd; font-weight: 600; font-size: 34px; line-height: 120%;">
        <img style="display: flex; width: 60px; height: 60px; border-radius: 30px; object-fit: cover;" src="${authorImg}"/>
        <div>
          ${authorName}
        </div>
      </div>
      <div style="color: #5c5f66; font-weight: 500; font-size: 30px; line-height: 120%">
        ${website}
      </div>
    </div>
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
						"https://og-anasrin.vercel.app/fonts/Inter/Inter-500.ttf"
					)
				).arrayBuffer(),
				weight: 500,
				style: "normal",
			},
			{
				name: "Inter",
				data: await (
					await fetch(
						"https://og-anasrin.vercel.app/fonts/Inter/Inter-600.ttf"
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