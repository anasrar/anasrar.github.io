import { FC } from "react";
import Link from "next/link";
import { Badge, Card, Group, Image, Stack, Text, Tooltip } from "@mantine/core";
import { BlogCardProps } from "./props";
import { IconCalendarEvent, IconClock, IconEdit } from "@tabler/icons";

export const BlogCard: FC<BlogCardProps> = ({
	hideTumbnail = false,
	url,
	title,
	date,
	formattedDate,
	lastmod,
	formattedLastmod,
	tags,
	showTags,
	estimate,
}) => {
	const minShowTags = Math.min(showTags, tags.length);
	const remainTags = tags.length - minShowTags;

	return (
		<Card
			component={Link}
			href={url}
			pos="static"
			withBorder
			p={0}
			shadow="xs"
		>
			{hideTumbnail ? null : (
				<Card.Section>
					<Image
						fit="cover"
						height={180}
						alt={`Thumbnail ${title}`}
						withPlaceholder
					/>
				</Card.Section>
			)}
			<Stack spacing="xs" p="sm">
				{minShowTags !== 0 ? (
					<Group position="apart" spacing="xs">
						<Group position="left" spacing="xs">
							{tags.slice(0, showTags).map((text, i) => (
								<Badge key={i} color="indigo" variant="dot">
									{text}
								</Badge>
							))}
						</Group>
						{remainTags !== 0 ? (
							<Tooltip
								label={
									<Group position="left" spacing="xs">
										{tags.slice(showTags).map((text, i) => (
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
									{remainTags}+
								</Badge>
							</Tooltip>
						) : null}
					</Group>
				) : null}
				<Text weight={700} size="md" lineClamp={1}>
					{title}
				</Text>
				<Text weight={600} size="xs" color="dimmed">
					<Group position="apart">
						{lastmod ? (
							<Tooltip
								position="bottom"
								label={
									<Text weight={400}>{formattedLastmod}</Text>
								}
							>
								<Group spacing={8}>
									<IconCalendarEvent size={16} />
									<Text
										component="time"
										dateTime={date}
										inherit
									>
										{formattedDate}
									</Text>
									<IconEdit size={16} />
								</Group>
							</Tooltip>
						) : (
							<Group spacing={8}>
								<IconCalendarEvent size={16} strokeWidth={2} />
								<Text component="time" dateTime={date} inherit>
									{formattedDate}
								</Text>
							</Group>
						)}
						<Group spacing={8}>
							<IconClock size={16} strokeWidth={2} />
							{estimate}
						</Group>
					</Group>
				</Text>
			</Stack>
		</Card>
	);
};
