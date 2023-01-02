import { GiscusProps } from "@giscus/react";

export type CommentProps = {
	lang?: GiscusProps["lang"];

	/** Hide go to GitHub Discussions button */
	hideDirectButton?: boolean;

	/** Go to GitHub Discussions button */
	directComment?: string;

	/** Hide write commentbutton */
	hideWriteCommentButton?: boolean;

	/** Write comment button */
	writeComment?: string;
};
