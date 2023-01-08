import { FC, HTMLProps } from "react";
import { Group, Image } from "@mantine/core";

export const ImageViewer: FC<HTMLProps<HTMLImageElement>> = ({ src, alt }) => {
	return (
		<>
			<Group position="center" mb="lg">
				<Image
					src={src}
					alt={alt}
					title={alt}
					fit="contain"
					radius="sm"
					style={{
						width: "auto",
						maxWidth: "100%",
						cursor: "zoom-in",
					}}
					onClick={() => window.open(src)}
				/>
			</Group>
		</>
	);
};
