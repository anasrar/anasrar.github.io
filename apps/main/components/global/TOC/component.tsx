import { FC, useEffect, useState } from "react";
import { TOCProps } from "./props";
import {
	ActionIcon,
	Box,
	createStyles,
	Menu,
	ScrollArea,
	Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconNotes } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	side: {
		position: "fixed",
		width: "190px",
		transform: `translateX(calc(-100% - ${theme.spacing.md}px))`,
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
		borderLeft: `2px solid ${
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
		borderLeftColor:
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
		bottom: theme.spacing.lg,
		transform: "translateY(-100%)",
		zIndex: 3,
	},
}));

const List: FC<{
	level: number;
	slug: string;
	label: string;
	active: boolean;
}> = ({ level, slug, label, active }) => {
	const { classes, cx } = useStyles();

	return (
		<>
			<Box
				component="a"
				href={`#${slug}`}
				id={`toc-${slug}`}
				className={cx(classes.link, {
					[classes.linkActive]: active,
				})}
				sx={(theme) => ({
					paddingLeft: (level - 1) * theme.spacing.sm,
				})}
				onClick={(ev) => {
					ev.preventDefault();

					if (typeof document !== "undefined") {
						document.getElementById(`link-${slug}`)?.focus({
							preventScroll: true,
						});
						document.getElementById(slug)?.scrollIntoView({
							behavior: "smooth",
						});
					}
				}}
			>
				{label}
			</Box>
		</>
	);
};

export const TOC: FC<TOCProps> = ({ items }) => {
	const matches = useMediaQuery("(min-width: 1130px)", true, {
		getInitialValueInEffect: false,
	});
	const { classes } = useStyles();
	const [active, setActive] = useState(items.length !== 0 ? items[0][1] : "");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const { isIntersecting, target } of entries) {
					if (isIntersecting) {
						setActive(target.id);
					}
				}
			},
			{
				rootMargin: "55px 0px -70% 0px",
			}
		);

		for (const [_level, slug, _label] of items) {
			const target = document.getElementById(slug);
			if (target) {
				observer.observe(target);
			}
		}

		return () => {
			observer.disconnect();
		};
	}, [items]);

	return (
		<>
			{matches ? (
				<div className={classes.side}>
					<ScrollArea.Autosize maxHeight="calc(100vh - 7rem)">
						{items.map(([level, slug, label]) => (
							<List
								key={slug}
								{...{
									level,
									slug,
									label,
									active: slug === active,
								}}
							/>
						))}
					</ScrollArea.Autosize>
				</div>
			) : (
				<div className={classes.FAB}>
					<Menu shadow="lg" width={180} position="top">
						<Menu.Target>
							<Tooltip label="Table of contents">
								<ActionIcon
									size="lg"
									variant="filled"
									color="indigo"
									aria-label="Open Menu"
								>
									<IconNotes size={22} />
								</ActionIcon>
							</Tooltip>
						</Menu.Target>

						<Menu.Dropdown>
							<ScrollArea.Autosize maxHeight="40vh">
								{items.map(([level, slug, label]) => (
									<List
										key={slug}
										{...{
											level,
											slug,
											label,
											active: slug === active,
										}}
									/>
								))}
							</ScrollArea.Autosize>
						</Menu.Dropdown>
					</Menu>
				</div>
			)}
		</>
	);
};
