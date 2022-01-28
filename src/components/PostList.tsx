import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

import Typography from "./Typography";

import GenerateLinkClickHandler from "@/utilities/GenerateLinkClickHandler";
import ClearDateFromSlug from "@/utilities/ClearDateFromSlug";

import NodePost from "@/types/NodePost";

interface LinkCustomProps {
	isNotLast: number;
}

interface LinkCustomStyledProps {
	styled: LinkCustomProps;
}

const LinkCustom = styled(Link)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
	padding: clamp(1em, 3vw, 1.25em) 0;
	overflow: hidden;

	${(props: LinkCustomStyledProps) =>
		props.styled.isNotLast ? `border-bottom: 1px solid #fff;` : ``}
	color: #fff;

	text-decoration: none;
`;

interface Props {
	isNotLast?: number;
	post: NodePost;
}

const PostList: React.FC<Props> = ({
	isNotLast,
	post: {
		frontmatter: { title, date },
		slug,
	},
}) => {
	const clearSlug = ClearDateFromSlug(slug);

	return (
		<LinkCustom
			to={`/blog/${clearSlug}`}
			styled={{ isNotLast }}
			onClick={GenerateLinkClickHandler(`/blog/${clearSlug}`, 1)}
		>
			<Typography
				element="section"
				display="block"
				fontFamily="'NeutralFace', sans-serif"
				fontWeight="700"
				fontSize="clamp(1em, 3vw, 1.25em)"
				lineHeight="1.25em"
			>
				{title}
			</Typography>
			<Typography
				element="section"
				display="block"
				fontFamily="'KharkivTone', sans-serif"
				fontSize="clamp(.75em, 3vw, 1.125em)"
				textTransform="uppercase"
			>
				{date.replace(/(\d+)-(\d+)-(\d+)([TZ.:\d]+)/, `$3-$2-$1`)}
			</Typography>
		</LinkCustom>
	);
};

PostList.defaultProps = {
	isNotLast: 0,
};

export default PostList;
