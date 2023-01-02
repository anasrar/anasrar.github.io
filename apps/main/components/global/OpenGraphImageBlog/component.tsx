// WARN: move to scripts/og-image.mjs
import { readFile, writeFile, mkdir } from "node:fs/promises";
import satori from "satori";
import { Blog, BlogTranslate } from "contentlayer/generated";
import { Resvg } from "@resvg/resvg-js";
import { Author } from "authors";
import { IconCalendarEvent, IconClock } from "@tabler/icons";

export const OpenGraphImageBlog = async ({
	title,
	formattedDate,
	estimate,
	dataAuthors,
	url,
}: Blog | BlogTranslate) => {
	const blank = (await import("remark-mdx-svg/dist/diagrams/blank")).blank;
	const data = {
		svg: {
			width: 136,
			height: 136,
		},
		annotations: [],
	};
	const check = await blank(data);
	let svg = "";
	if (check.success) {
		svg = check.output;
	} else {
		svg = "";
	}
	const htmlReactElement = (
		await import("remark-mdx-svg/dist/utlis/htmlreactelement")
	).htmlReactElement;

	svg = await satori(
		<div
			style={{
				display: "flex",
				flexFlow: "column nowrap",
				justifyContent: "flex-end",
				alignItems: "stretch",
				width: "600px",
				height: "315px",
				color: "#f8f9fa",
				background: "#101113",
				padding: "16px",
				fontFamily: "Open Sauce Two",
			}}
		>
			<div
				style={{
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "center",
					alignItems: "center",
					flex: "1 1",
				}}
			>
				<div
					style={{
						display: "flex",
						flexFlow: "row nowrap",

						margin: "12px",
					}}
				>
					{htmlReactElement(svg)}
				</div>
			</div>
			<div
				style={{
					marginBottom: "12px",
					fontSize: "26px",
					fontWeight: 700,
				}}
			>
				{title}
			</div>
			<div
				style={{
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexFlow: "row nowrap",
						color: "#909296",
						fontWeight: 600,
						fontSize: "12px",
					}}
				>
					<div
						style={{
							display: "flex",
							flexFlow: "row nowrap",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<IconCalendarEvent size={16} color="#909296" />
						<span style={{ marginLeft: "8px" }}>
							{formattedDate}
						</span>
					</div>
					<div
						style={{
							display: "flex",
							flexFlow: "row nowrap",
							justifyContent: "center",
							alignItems: "center",
							marginLeft: "16px",
						}}
					>
						<IconClock size={16} color="#909296" />
						<span style={{ marginLeft: "8px" }}>{estimate}</span>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						flexFlow: "row nowrap",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{Object.entries(dataAuthors as Record<string, Author>).map(
						([k, a]) => (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								key={k}
								src={a.image}
								alt={k}
								width={28}
								height={28}
								style={{
									marginLeft: "4px",
									borderRadius: "14px",
								}}
							/>
						)
					)}
				</div>
			</div>
		</div>,
		{
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
		}
	);

	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	await mkdir(`./public/assets${url}/`, {
		recursive: true,
	});
	await writeFile(`./public/assets${url}/og.png`, pngBuffer);

	return <></>;
};
