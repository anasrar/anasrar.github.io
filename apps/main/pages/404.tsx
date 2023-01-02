import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { Button, Container, Stack, Title } from "@mantine/core";

export const NotFoundPage: FC = () => {
	return (
		<main
			style={{
				display: "flex",
				flex: "1 0 auto",
				flexFlow: "column nowrap",
				justifyContent: "center",
			}}
		>
			<Head>
				<title>Page Not Found</title>
			</Head>

			<Container size="sm" p="sm">
				<Stack align="center" spacing="md">
					<Title order={1}>Page Not Found</Title>
					<Button component={Link} href="/" size="xs" color="indigo">
						Back to home
					</Button>
				</Stack>
			</Container>
		</main>
	);
};

export default NotFoundPage;
