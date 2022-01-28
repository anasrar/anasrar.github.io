import FrontMatterPost from "./FrontMatterPost";

export default interface NodePost {
	id: string;
	body: string;
	frontmatter: FrontMatterPost;
	slug: string;
}
