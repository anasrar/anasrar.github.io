import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC } from "react";
import { Container, Stack, Text, Title } from "@mantine/core";

const Head = dynamic(() =>
	import("../../components/global/Head").then((c) => c.Head)
);
const OpenGraph = dynamic(() =>
	import("../../components/global/OpenGraph").then((c) => c.OpenGraph)
);
const LinkedDataJSON = dynamic(() =>
	import("../../components/global/LinkedDataJSON").then(
		(c) => c.LinkedDataJSON
	)
);
const Comment = dynamic(() =>
	import("../../components/global/Comment").then((c) => c.Comment)
);

const title = "Guestbook - Anas Rin";
const description =
	"Don't be shy to say hello, feel free to post anything, even shitpost is allowed.";

export const RootPage: FC = () => {
	const { pathname } = useRouter();

	return (
		<main>
			<Head title={title} description={description} />
			<OpenGraph
				basic={{
					title: title,
					description: description,
					type: "website",
					image: `https://avatars.githubusercontent.com/u/38805204`,
					url: `${process.env.SITE_URL}${pathname}/`,
					locale: "en_US",
					site_name: "Anas Rin",
				}}
				data={null}
				twitter={{
					card: "summary",
					title: title,
					site: "@rrrriiiiiinnnn",
					description: description,
					image: "https://avatars.githubusercontent.com/u/38805204",
				}}
			/>
			<LinkedDataJSON
				data={{
					"@context": "https://schema.org",
					"@type": "WebSite",
					url: `${process.env.SITE_URL}${pathname}/`,
					name: title,
					description: description,
					publisher: {
						"@type": "ProfilePage",
						name: "Anas Rin",
					},
				}}
			/>

			<Container size="sm" p="sm" pb="xl">
				<Stack spacing="lg" pt="xl">
					<Stack spacing={0}>
						<Title size="h3" order={2}>
							Guestbook
						</Title>
						<Text weight={600} size="sm" color="dimmed">
							{description}
						</Text>
					</Stack>
					<Comment writeComment="Write Guestbook" />
				</Stack>
			</Container>
		</main>
	);
};

export default RootPage;
