import { FC } from "react";
import {
	ActionIcon,
	Box,
	createStyles,
	Menu,
	ScrollArea,
	Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { LanguageProps } from "./props";
import { useMediaQuery } from "@mantine/hooks";
import { IconLanguage } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	side: {
		position: "fixed",
		alignSelf: "end",
		width: "190px",
		transform: `translateX(calc(100% + ${theme.spacing.md}px))`,
	},
	link: {
		...theme.fn.focusStyles(),
		display: "block",
		textDecoration: "none",
		color:
			theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		lineHeight: 1.2,
		fontSize: theme.fontSizes.sm,
		padding: theme.spacing.xs,
		borderRight: `2px solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[4]
				: theme.colors.gray[3]
		}`,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		fontWeight: 600,
		borderRightColor:
			theme.colors.indigo[theme.colorScheme === "dark" ? 6 : 7],
		color: theme.colors.indigo[theme.colorScheme === "dark" ? 2 : 7],

		"&, &:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.fn.rgba(theme.colors.indigo[9], 0.25)
					: theme.colors.indigo[0],
		},
	},
	FAB: {
		position: "fixed",
		bottom: theme.spacing.lg + theme.spacing.sm,
		transform: "translateY(-200%)",
		zIndex: 3,
	},
}));

const List: FC<{
	url: string;
	native: string;
	active: boolean;
}> = ({ url, native, active }) => {
	const { classes, cx } = useStyles();

	return (
		<>
			<Box
				component={Link}
				href={url}
				className={cx(classes.link, {
					[classes.linkActive]: active,
				})}
			>
				{native}
			</Box>
		</>
	);
};

export const Language: FC<LanguageProps> = ({ active, items }) => {
	const matches = useMediaQuery("(min-width: 1130px)", true, {
		getInitialValueInEffect: false,
	});
	const { classes } = useStyles();
	const languages = Object.entries(items);

	return (
		<>
			{languages.length > 1 ? (
				<>
					{matches ? (
						<div className={classes.side}>
							<ScrollArea.Autosize maxHeight="calc(100vh - 7rem)">
								{languages.map(([code, { native, url }]) => (
									<List
										key={code}
										{...{
											native,
											url: url ?? "",
											active: code === active,
										}}
									/>
								))}
							</ScrollArea.Autosize>
						</div>
					) : (
						<div className={classes.FAB}>
							<Menu shadow="lg" width={180} position="top">
								<Menu.Target>
									{/* TODO: tooltip locales */}
									<Tooltip label="Languages">
										<ActionIcon
											size="lg"
											variant="filled"
											color="indigo"
											aria-label="Open Menu"
										>
											<IconLanguage size={22} />
										</ActionIcon>
									</Tooltip>
								</Menu.Target>

								<Menu.Dropdown>
									<ScrollArea.Autosize maxHeight="40vh">
										{languages.map(
											([code, { native, url }]) => (
												<List
													key={code}
													{...{
														native,
														url: url ?? "",
														active: code === active,
													}}
												/>
											)
										)}
									</ScrollArea.Autosize>
								</Menu.Dropdown>
							</Menu>
						</div>
					)}
				</>
			) : null}
		</>
	);
};
