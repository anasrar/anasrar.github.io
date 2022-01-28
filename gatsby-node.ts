import { resolve } from "path";

import { CreateWebpackConfigArgs, CreatePagesArgs } from "gatsby";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import Data from "./src/types/Data";

import ClearDateFromSlug from "./src/utilities/ClearDateFromSlug"; 

export const onCreateWebpackConfig = (args: CreateWebpackConfigArgs)=>{
	args.actions.setWebpackConfig({
		resolve: {
			plugins: [
				new TSConfigPathsPlugin()
			],
		},
	});
}

export const createPages = async(args: CreatePagesArgs)=>{
	const { graphql, actions: { createPage }, reporter } = args;
	const result = await graphql(`
		query CreatePostPages {
			allMdx {
				edges {
					node {
						id
						frontmatter {
							title
							date
						}
						slug
					}
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
	}

	// TODO : Prevent Duplicate Slug Post File Naming Convention Using ClearDateFromSlug
	// e.g
	// 2022-01-01-fizz-buzz -> fizz-buzz
	// 2022-02-01-fizz-buzz -> fizz-buzz

	const posts = (result.data as Data).allMdx.edges;
	posts.forEach(({node})=>{
		createPage({
			path: `/blog/${ClearDateFromSlug(node.slug)}`,
			component: resolve(`./src/layout/post.tsx`),
			context: {
				id: node.id,
			},
		});
	});
};
