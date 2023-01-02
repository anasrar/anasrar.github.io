import Head from "next/head";
import { OpenGraphMap, OpenGraphProps } from "./props";

export const OpenGraph = <T extends keyof OpenGraphMap = "website">({
	basic: {
		title,
		type,
		image,
		url,
		audio,
		description,
		determiner,
		locale,
		site_name,
		video,
		...basic
	},
	data,
	additional,
	twitter,
}: OpenGraphProps<T>) => {
	return (
		<Head>
			<meta property="og:title" content={title} />
			<meta property="og:type" content={type} />
			<meta property="og:image" content={image} />
			<meta
				property="og:url"
				content={url ?? `${process.env.SITE_URL}`}
			/>
			{audio ? <meta property="og:audio" content={audio} /> : null}
			{description ? (
				<meta property="og:description" content={description} />
			) : null}
			{determiner ? (
				<meta property="og:determiner" content={determiner} />
			) : null}
			{locale ? <meta property="og:locale" content={locale} /> : null}
			{basic["locale:alternate"]?.map((l) => (
				<meta
					key={`locale:alternate:${l}`}
					property="og:locale:alternate"
					content={l}
				/>
			))}
			{site_name ? (
				<meta property="og:site_name" content={site_name} />
			) : null}
			{video ? <meta property="og:video" content={video} /> : null}
			{/* TODO: implement video and music */}
			{type === "article" ? (
				<>
					<meta
						property="article:published_time"
						content={
							(data as OpenGraphMap["article"])[
								"article:published_time"
							]
						}
					/>
					{(data as OpenGraphMap["article"])[
						"article:modified_time"
					] ? (
						<meta
							property="article:modified_time"
							content={
								(data as OpenGraphMap["article"])[
									"article:modified_time"
								]
							}
						/>
					) : null}
					{(data as OpenGraphMap["article"])[
						"article:expiration_time"
					] ? (
						<meta
							property="article:expiration_time"
							content={
								(data as OpenGraphMap["article"])[
									"article:expiration_time"
								]
							}
						/>
					) : null}
					{(data as OpenGraphMap["article"])["article:author"].map(
						(a) => (
							<meta
								key={`article:author:${a}`}
								property="article:author"
								content={a}
							/>
						)
					)}
					{(data as OpenGraphMap["article"])["article:section"] ? (
						<meta
							property="article:section"
							content={
								(data as OpenGraphMap["article"])[
									"article:section"
								]
							}
						/>
					) : null}
					{(data as OpenGraphMap["article"])["article:tag"].map(
						(t) => (
							<meta
								key={`article:tag:${t}`}
								property="article:tag"
								content={t}
							/>
						)
					)}
				</>
			) : null}
			{type === "book" ? (
				<>
					{(data as OpenGraphMap["book"])["book:author"].map((a) => (
						<meta
							key={`book:author:${a}`}
							property="book:author"
							content={a}
						/>
					))}
					<meta
						property="book:isbn"
						content={(data as OpenGraphMap["book"])["book:isbn"]}
					/>
					<meta
						property="book:release_date"
						content={
							(data as OpenGraphMap["book"])["book:release_date"]
						}
					/>
					{(data as OpenGraphMap["book"])["book:author"].map((t) => (
						<meta
							key={`book:tag:${t}`}
							property="book:tag"
							content={t}
						/>
					))}
				</>
			) : null}
			{type === "profile" ? (
				<>
					<meta
						property="profile:first_name"
						content={
							(data as OpenGraphMap["profile"])[
								"profile:first_name"
							]
						}
					/>
					<meta
						property="profile:last_name"
						content={
							(data as OpenGraphMap["profile"])[
								"profile:last_name"
							]
						}
					/>
					<meta
						property="profile:username"
						content={
							(data as OpenGraphMap["profile"])[
								"profile:username"
							]
						}
					/>
					<meta
						property="profile:gender"
						content={
							(data as OpenGraphMap["profile"])["profile:gender"]
						}
					/>
				</>
			) : null}
			{additional
				? additional.map(([key, val], i) => (
						<meta
							key={`additional:${key}:${i}`}
							property={key}
							content={val}
						/>
				  ))
				: null}
			{twitter ? (
				<>
					<meta name="twitter:card" content={twitter.card} />
					{twitter.site ? (
						<meta name="twitter:site" content={twitter.site} />
					) : null}
					<meta name="twitter:title" content={twitter.title} />
					{twitter.description ? (
						<meta
							name="twitter:description"
							content={twitter.description}
						/>
					) : null}
					{twitter.image ? (
						<meta name="twitter:image" content={twitter.image} />
					) : null}
				</>
			) : null}
		</Head>
	);
};
