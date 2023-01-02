import { GiscusProps } from "@giscus/react";

export type Locale = {
	/** Open Graph locale */
	og: string;

	/** Native word */
	native: string;

	/** Publish date */
	date: string;

	/** Last modification date */
	lastmod: string;

	/** Estimate read */
	estimate: string;

	/** Giscus language */
	giscusLang: GiscusProps["lang"];

	/** Go to GitHub Discussions button */
	giscusDirectComment: string;

	/** Write comment button */
	giscusWriteComment: string;

	/** Get assign in contentlayer/blog/index.ts */
	url?: string;
};

export const locales: Map<string, Locale> = new Map([
	[
		"en-US",
		{
			og: "en_US",
			native: "English",
			date: "LLLL d, yyyy",
			lastmod: "'Last update on' LLLL d, yyyy",
			estimate: "{} min read",
			giscusLang: "en",
			giscusDirectComment: "Open GitHub Discussions",
			giscusWriteComment: "Write comment",
		},
	],
	[
		"ja-JP",
		{
			og: "ja_JP",
			native: "日本語",
			date: "yyyy 年 L 月 d 日",
			lastmod: "最終更新日 yyyy 年 L 月 d 日",
			estimate: "{} 分で読めます",
			giscusLang: "ja",
			giscusDirectComment: "GitHub Discussions を開く",
			giscusWriteComment: "コメントを書く",
		},
	],
	[
		"id-ID",
		{
			og: "id_ID",
			native: "Bahasa Indonesia",
			date: "LLLL d, yyyy",
			lastmod: "Terakhir diperbarui LLLL d, yyyy",
			estimate: "{} menit membaca",
			giscusLang: "id",
			giscusDirectComment: "Buka GitHub Discussions",
			giscusWriteComment: "Tulis komentar",
		},
	],
]);
