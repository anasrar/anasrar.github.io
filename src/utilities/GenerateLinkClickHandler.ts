import { navigate } from "gatsby";

import { PageShow } from "../states/Page";

const GenerateLinkClickHandler =
	(url: string, duration: number) =>
	(event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (PageShow.get()) {
			PageShow.set(() => false);
			setTimeout(() => {
				navigate(url);
			}, 1000 * duration);
		}
	};

export default GenerateLinkClickHandler;
