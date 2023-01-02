import { FC } from "react";
import {
	Badge,
	Button,
	Card,
	Group,
	Image,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { ProjectCardProps } from "./props";
import { IconBrandGithub, IconInfoCircle } from "@tabler/icons";
import Link from "next/link";

export const ProjectCard: FC<ProjectCardProps> = ({
	hideTumbnail = false,
	title,
	stack,
	showStack,
	repository,
	url,
}) => {
	const minShowStack = Math.min(showStack, stack.length);
	const remainStack = stack.length - minShowStack;

	return (
		<Card pos="static" withBorder p={0} shadow="xs">
			{hideTumbnail ? null : (
				<Card.Section>
					<Image
						fit="cover"
						height={180}
						alt={`Thumbnail`}
						withPlaceholder
					/>
				</Card.Section>
			)}
			<Stack spacing="xs" p="sm">
				<Text weight={700} size="md" lineClamp={1}>
					{title}
				</Text>
				{minShowStack !== 0 ? (
					<Group position="apart" spacing="xs">
						<Group position="left" spacing="xs">
							{stack.slice(0, showStack).map((text, i) => (
								<Badge key={i} color="indigo" variant="dot">
									{text}
								</Badge>
							))}
						</Group>
						{remainStack !== 0 ? (
							<Tooltip
								label={
									<Group position="left" spacing="xs">
										{stack
											.slice(showStack)
											.map((text, i) => (
												<Badge
													key={i}
													color="indigo"
													variant="dot"
												>
													{text}
												</Badge>
											))}
									</Group>
								}
							>
								<Badge color="indigo" variant="light">
									{remainStack}+
								</Badge>
							</Tooltip>
						) : null}
					</Group>
				) : null}
				<Group grow spacing="xs">
					<Button
						component={Link}
						href={url}
						size="xs"
						color="indigo"
						leftIcon={<IconInfoCircle size={18} />}
					>
						Detail
					</Button>
					<Button
						component="a"
						href={repository}
						target="_blank"
						rel="noopener noreferrer"
						size="xs"
						color="indigo"
						aria-label="GitHub Repo"
						leftIcon={<IconBrandGithub size={18} />}
					>
						Repository
					</Button>
				</Group>
			</Stack>
		</Card>
	);
};
