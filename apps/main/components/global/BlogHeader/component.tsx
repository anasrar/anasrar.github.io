import { Blog, BlogTranslate } from "contentlayer/generated";
import { Author } from "authors";
import { FC } from "react";
import { Avatar, Badge, Group, Text, Tooltip } from "@mantine/core";
import { IconCalendarEvent, IconClock, IconEdit } from "@tabler/icons";

export const BlogHeader: FC<Blog | BlogTranslate> = ({
	title,
	date,
	formattedDate,
	lastmod,
	formattedLastmod,
	estimate,
	tags,
	dataAuthors,
}) => {
	return (
		<>
			{tags.length !== 0 ? (
				<Group position="left" spacing="xs">
					{tags.map((text) => (
						<Badge key={text} color="indigo" variant="dot">
							{text}
						</Badge>
					))}
				</Group>
			) : null}
			<Text component="h1" weight={700} size="xl" m={0}>
				{title}
			</Text>
			<Group position="apart">
				<Text weight={600} size="xs" color="dimmed">
					<Group spacing="md">
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
								<IconCalendarEvent size={16} />
								<Text component="time" dateTime={date} inherit>
									{formattedDate}
								</Text>
							</Group>
						)}
						<Group spacing={8}>
							<IconClock size={16} />
							{estimate}
						</Group>
					</Group>
				</Text>
				<Tooltip.Group closeDelay={100}>
					<Avatar.Group spacing="xs">
						{Object.entries(
							dataAuthors as Record<string, Author>
						).map(([k, a]) => (
							<Tooltip key={k} label={k} withArrow>
								<Avatar
									component="a"
									href={a.url}
									target="_blank"
									src={a.image}
									alt={k}
									size="sm"
									radius="xl"
								/>
							</Tooltip>
						))}
					</Avatar.Group>
				</Tooltip.Group>
			</Group>
		</>
	);
};
