import Site from "./Site";
import AllMdx from "./AllMdx";
import NodePost from "./NodePost";

export default interface Data {
	site: Site;
	allMdx: AllMdx;
	mdx: NodePost;
}
