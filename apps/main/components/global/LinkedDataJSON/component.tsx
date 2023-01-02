import { FC } from "react";
import { LinkedDataJSONProps } from "./props";

export const LinkedDataJSON: FC<LinkedDataJSONProps> = ({ data }) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
		/>
	);
};
