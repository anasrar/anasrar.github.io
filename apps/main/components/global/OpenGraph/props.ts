type protocol = "http" | "https";
type url = `${protocol}://${string}`;

type OpenGraphMusicSong = {
	"music:duration": number;
	"music:album": [url, number, number][];
	"music:musician": [url, number, number][];
};

type OpenGraphMusicAlbum = {
	"music:song": [url, number, number][];
	"music:musician": url[];
	"music:release_date": string;
};

type OpenGraphMusicPlaylist = {
	"music:song": [url, number, number][];
	"music:creator": url[];
};

type OpenGraphMusicRadioStation = {
	"music:creator": url[];
};

type OpenGraphVideoMovie = {
	"video:actor": [url, string][];
	"video:director": url[];
	"video:writer": url[];
	"video:duration": number;
	"video:release_date": string;
	"video:tag": string[];
};

type OpenGraphVideoEpisode = OpenGraphVideoMovie & {
	"video:series": string;
};

type OpenGraphArticle = {
	"article:published_time": string;
	"article:modified_time": string;
	"article:expiration_time": string;
	"article:author": url[];
	"article:section": string;
	"article:tag": string[];
};

type OpenGraphBook = {
	"book:author": url[];
	"book:isbn": string;
	"book:release_date": string;
	"book:tag": string[];
};

type OpenGraphProfile = {
	"profile:first_name": string;
	"profile:last_name": string;
	"profile:username": string;
	"profile:gender": "male" | "female";
};

export type OpenGraphMap = {
	"music.song": OpenGraphMusicSong;
	"music.album": OpenGraphMusicAlbum;
	"music.playlist": OpenGraphMusicPlaylist;
	"music.radio_station": OpenGraphMusicRadioStation;
	"video.movie": OpenGraphVideoMovie;
	"video.episode": OpenGraphVideoEpisode;
	"video.tv_show": OpenGraphVideoMovie;
	"video.other": OpenGraphVideoMovie;
	article: OpenGraphArticle;
	book: OpenGraphBook;
	profile: OpenGraphProfile;
	website?: null;
};

export type OpenGraphProps<T extends keyof OpenGraphMap = "website"> = {
	basic: {
		title: string;
		type: T;
		image: string;
		url?: string;
		audio?: string;
		description?: string;
		determiner?: "a" | "an" | "" | "auto";
		locale?: string;
		"locale:alternate"?: string[];
		site_name?: string;
		video?: string;
	};
	/** Additional meta data */
	additional?: [string, string][];
	twitter?: {
		card: "summary" | "summary_large_image";
		site?: `@${string}`;
		title: string;
		description?: string;
		image?: url;
	};
} & {
	/** Data base on `basic.type` */
	data: OpenGraphMap[T];
};
