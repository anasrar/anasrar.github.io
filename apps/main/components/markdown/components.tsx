import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import {
	ActionIcon,
	CopyButton,
	Group,
	Text,
	Title,
	TitleOrder,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import { useStyles } from "./style";
import { IconCheck, IconLink } from "@tabler/icons";

export const P: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Text component="p" mt={0} mb="lg" size="md">
			{children}
		</Text>
	);
};

export const A: FC<
	PropsWithChildren<{
		id?: string;
		href: string;
		newTab?: boolean;
		useNextLink?: boolean;
	}>
> = ({ href, id, newTab = false, useNextLink = false, children }) => {
	const { colorScheme } = useMantineColorScheme();
	const { classes } = useStyles();
	const linkColor = colorScheme === "dark" ? "indigo.5" : "indigo.8";

	if (useNextLink) {
		return (
			<Text
				component={Link}
				href={href}
				id={id}
				className={classes.scrollOffset}
				color={linkColor}
				inherit
			>
				{children}
			</Text>
		);
	}

	return (
		<Text
			component="a"
			id={id}
			className={classes.scrollOffset}
			href={href}
			target={newTab ? "_blank" : undefined}
			color={linkColor}
		>
			{children}
		</Text>
	);
};

export const H: FC<PropsWithChildren<{ level?: TitleOrder; id?: string }>> = ({
	level = 2,
	id = "none",
	children,
}) => {
	const { classes } = useStyles();
	const host = typeof window === "undefined" ? "" : window.location.host;
	const pathname = usePathname();

	return (
		<Group position="apart" spacing="md" mb="lg">
			<Title order={level} id={id} className={classes.scrollOffset}>
				{children}
			</Title>
			<CopyButton value={`${host}${pathname}#${id}`}>
				{({ copied, copy }) => (
					<Tooltip
						label={copied ? "Copied url" : "Copy url"}
						withArrow
						position="left"
					>
						<ActionIcon
							id={`link-${id}`}
							size="xs"
							color={copied ? "teal" : "gray"}
							onClick={copy}
							aria-label="Copy url"
						>
							{copied ? (
								<IconCheck size={16} />
							) : (
								<IconLink size={16} />
							)}
						</ActionIcon>
					</Tooltip>
				)}
			</CopyButton>
		</Group>
	);
};
