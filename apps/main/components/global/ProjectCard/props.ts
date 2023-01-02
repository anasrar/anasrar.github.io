import { Projects } from "contentlayer/generated";

export type ProjectCardProps = Projects & {
	hideTumbnail?: boolean;
};
