const ClearDateFromSlug: (slug: string) => string = (slug: string) =>
	slug.replace(/(\d+)-(\d+)-(\d+)-/, ``);

export default ClearDateFromSlug;
