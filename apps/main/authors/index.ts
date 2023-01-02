type protocol = "http" | "https";
type url = `${protocol}://${string}`;

export type Author = {
	/** Image author */
	image: url;

	/** Url to website author, recommend to implement Open Graph profile page */
	url: url;
};

export const authors = new Map<string, Author>([
	[
		"Anas Rin",
		{
			image: "https://avatars.githubusercontent.com/u/38805204",
			url: "https://anasrar.github.io/",
		},
	],
]);
