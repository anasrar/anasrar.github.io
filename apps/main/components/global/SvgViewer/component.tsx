import { FC, PropsWithChildren, MouseEvent } from "react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconDownload, IconExternalLink } from "@tabler/icons";

export const SvgViewer: FC<PropsWithChildren> = ({ children }) => {
	const h = (download: boolean) =>
		function (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
			const parent = ev.currentTarget.parentElement;
			const svg =
				parent?.parentElement?.querySelector<SVGElement>("svg.mdx-svg");
			if (parent && svg) {
				const anchor = document.createElement("a");
				anchor.setAttribute("style", "display: none");
				document.body.appendChild(anchor);

				if (parent.hasAttribute("blob")) {
					anchor.href = parent.getAttribute("blob")!;
				} else {
					const copySvg = svg.cloneNode(true) as SVGElement;
					const font = Array.from(
						copySvg.querySelectorAll<SVGGElement>(
							"defs.font-comment g[font]"
						)
					).reduce((acc, c) => {
						return `${acc}@import url(${c.getAttribute("font")});`;
					}, "");

					if (font.length) {
						const style = document.createElement("style");
						style.textContent = font;
						copySvg.prepend(style);
						copySvg.querySelector("defs.font-comment")?.remove();
					}

					const result = copySvg.outerHTML;
					anchor.href = window.URL.createObjectURL(
						new Blob([result], {
							type: "image/svg+xml",
						})
					);
					parent.setAttribute("blob", anchor.href);
					copySvg.remove();
				}

				if (download) {
					anchor.download = "image.svg";
				} else {
					anchor.target = "_blank";
				}

				anchor.click();
				anchor.remove();
			}
		};

	return (
		<Group position="center" mb="md" style={{ position: "relative" }}>
			<Group
				spacing="xs"
				style={{
					position: "absolute",
					top: "0",
					right: "0",
				}}
			>
				<Tooltip label="Download SVG">
					<ActionIcon
						variant="light"
						color="indigo"
						onClick={(ev) => {
							h(true)(ev);
						}}
						aria-label="Download SVG"
					>
						<IconDownload size={16} />
					</ActionIcon>
				</Tooltip>
				<Tooltip label="Open new tab">
					<ActionIcon
						variant="light"
						color="indigo"
						onClick={(ev) => {
							h(false)(ev);
						}}
						aria-label="Open new tab"
					>
						<IconExternalLink size={16} />
					</ActionIcon>
				</Tooltip>
			</Group>
			{children}
		</Group>
	);
};
