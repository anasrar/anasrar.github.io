import { Blog } from "contentlayer/generated";

export type BlogCardProps = Blog & {
	hideTumbnail?: boolean;
};
