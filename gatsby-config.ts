import SiteMetaData from "./src/types/SiteMetaData";

export const siteMetadata : SiteMetaData = {
	title: `Anas Rin`,
	description: `Full Stack Developer`,
};

export const flags = {
};

export const plugins = [
	`gatsby-plugin-react-helmet`,
	{
		resolve: `gatsby-source-filesystem`,
		options: {
			name: `posts`,
			path: `${__dirname}/src/posts/`,
		},
	},
	`gatsby-plugin-mdx`,
];
