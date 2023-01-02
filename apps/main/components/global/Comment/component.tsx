import { FC } from "react";
import { usePathname } from "next/navigation";
import { Button, Group, Stack, useMantineColorScheme } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconEdit, IconExternalLink } from "@tabler/icons";
import Giscus from "@giscus/react";
import { CommentProps } from "./props";

export const Comment: FC<CommentProps> = ({
	lang = "en",
	hideDirectButton = false,
	directComment = "Open GitHub Discussions",
	hideWriteCommentButton = false,
	writeComment = "Write comment",
}) => {
	const pathname = usePathname()?.slice(1);
	const { colorScheme } = useMantineColorScheme();

	const [ref, rect] = useResizeObserver<HTMLDivElement>();

	return (
		<>
			<Stack id="wrapper-comments">
				{hideDirectButton ? null : (
					<Group position="center">
						<Button
							component="a"
							href={`//github.com/anasrar/anasrar.github.io/discussions/categories/giscus?discussions_q="${pathname}"`}
							target="_blank"
							size="xs"
							color="green.8"
							rightIcon={<IconExternalLink size={16} />}
						>
							{directComment}
						</Button>
					</Group>
				)}
				<div ref={ref} id="wrapper-giscus">
					<Giscus
						id="giscus"
						repo="anasrar/anasrar.github.io"
						repoId="MDEwOlJlcG9zaXRvcnkxNjc3MzYzNDQ="
						category="Giscus"
						categoryId="DIC_kwDOCf90GM4CS47a"
						mapping="pathname"
						term="Foo"
						reactionsEnabled="1"
						emitMetadata="0"
						inputPosition="top"
						theme={colorScheme === "dark" ? "dark" : "light"}
						lang={lang}
						loading="lazy"
					/>
				</div>
				{hideWriteCommentButton || rect.height < 333 ? null : (
					<Group
						position="center"
						sx={(theme) => ({
							position: "sticky",
							bottom: theme.spacing.xs,
						})}
					>
						<Button
							component="a"
							href="#giscus"
							size="xs"
							color="green.8"
							rightIcon={<IconEdit size={16} />}
							onClick={(e) => {
								e.preventDefault();
								if (typeof document !== "undefined") {
									document
										.getElementById("wrapper-giscus")
										?.scrollIntoView({
											block: "start",
											behavior: "smooth",
										});
								}
							}}
						>
							{writeComment}
						</Button>
					</Group>
				)}
			</Stack>
		</>
	);
};
