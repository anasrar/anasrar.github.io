import NextHead from "next/head";
import { FC } from "react";
import { HeadProps } from "./props";

export const Head: FC<HeadProps> = ({ title, description }) => {
	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={description} />
		</NextHead>
	);
};
