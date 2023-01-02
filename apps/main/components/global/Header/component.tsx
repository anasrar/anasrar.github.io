import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	ActionIcon,
	Button,
	Container,
	Group,
	MediaQuery,
	Menu,
	Stack,
	Text,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import {
	IconHomeStar,
	IconLayoutGridAdd,
	IconMenu2,
	IconMessages,
	IconMoon,
	IconNews,
	IconSun,
} from "@tabler/icons";
import classes from "./style.module.scss";

const showMenu = 530;

const pages: [string, string, ReactNode][] = [
	["Home", "/", <IconHomeStar key="Home" />],
	["Guestbook", "/guestbook/", <IconMessages key="Guestbook" />],
	["Projects", "/projects/", <IconLayoutGridAdd key="Projects" />],
	["Blog", "/blog/", <IconNews key="Blog" />],
];

export const Header: FC = () => {
	const pathname = usePathname();
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<nav
			className={`${classes.header} ${
				colorScheme === "dark" ? "" : classes.light
			}`}
		>
			<Container size="sm" p="xs">
				<Stack spacing="xs">
					<Group spacing="xs" position="apart">
						<Group spacing="xs" align="center">
							<MediaQuery
								query={`(min-width: ${showMenu}px)`}
								styles={{
									display: "none",
								}}
							>
								<Group spacing="xs" align="center">
									<Menu shadow="lg" width={150}>
										<Menu.Target>
											<Tooltip label="Open Menu">
												<ActionIcon
													size="lg"
													variant="filled"
													color="indigo"
													aria-label="Open Menu"
												>
													<IconMenu2 size={22} />
												</ActionIcon>
											</Tooltip>
										</Menu.Target>

										<Menu.Dropdown>
											<Menu.Label>Pages</Menu.Label>
											{pages.map(([text, link, icon]) => (
												<Menu.Item
													component={Link}
													href={link}
													key="text"
													icon={icon}
												>
													{text}
												</Menu.Item>
											))}
										</Menu.Dropdown>
									</Menu>
									<Text weight={700} size="xs">
										Pages
									</Text>
								</Group>
							</MediaQuery>
							<MediaQuery
								query={`(max-width: ${showMenu - 1}px)`}
								styles={{
									display: "none",
								}}
							>
								<Group spacing="xs" align="center">
									{pages.map(([text, link, icon]) => (
										<Button
											key={text}
											component={Link}
											href={link}
											size="xs"
											variant={
												pathname === link
													? "filled"
													: "subtle"
											}
											color="indigo"
											leftIcon={icon}
										>
											{text}
										</Button>
									))}
								</Group>
							</MediaQuery>
						</Group>
						<Group spacing="xs" align="center">
							<Tooltip label="Toggle Dark/Light Mode">
								<ActionIcon
									size="lg"
									variant="default"
									aria-label="Toggle Dark/Light Mode"
									onClick={() => toggleColorScheme()}
								>
									{colorScheme === "dark" ? (
										<IconSun size={22} />
									) : (
										<IconMoon size={22} />
									)}
								</ActionIcon>
							</Tooltip>
						</Group>
					</Group>
				</Stack>
			</Container>
		</nav>
	);
};
