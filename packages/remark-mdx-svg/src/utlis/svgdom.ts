import { JSDOM } from "jsdom";

export const createSVGDom = (width: number, height: number) => {
	const j = new JSDOM(
		`<html>
	<head></head>
	<body>
		<svg class="mdx-svg" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"></svg>
	</body>
</html>`,
		{
			pretendToBeVisual: true,
		}
	);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return j.window.document.querySelector("svg")!;
};
