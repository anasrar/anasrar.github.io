import { Projects } from "contentlayer/generated";
import { FC } from "react";
import { Badge, Button, Group, Stack, Text } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons";

export const ProjectHeader: FC<Projects> = ({ title, stack, links }) => {
	return (
		<>
			<Stack spacing="xs">
				{stack.length !== 0 ? (
					<Group position="left" spacing="xs">
						{stack.map((text) => (
							<Badge key={text} color="indigo" variant="dot">
								{text}
							</Badge>
						))}
					</Group>
				) : null}
				<Text component="h1" weight={700} size="xl" m={0}>
					{title}
				</Text>
				{links.length !== 0 ? (
					<Group position="left" spacing="xs">
						{links.map(({ label, link }) => (
							<Button
								key={label}
								component="a"
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								size="xs"
								variant="default"
								color="indigo"
								leftIcon={<IconExternalLink size={14} />}
							>
								{label}
							</Button>
						))}
					</Group>
				) : null}
			</Stack>
		</>
	);
};
