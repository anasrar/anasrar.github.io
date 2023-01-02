import HTMLReactParser from "html-react-parser";

export const htmlReactElement = (str: string) => {
	return HTMLReactParser(str);
};
