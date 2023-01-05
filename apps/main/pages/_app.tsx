import { FC } from "react";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import "../styles/app.scss";
import { Loadbar } from "components/global/Loadbar";
import { Header } from "components/global/Header";
import { Footer } from "components/global/Footer";

const openSauceTwoFonts = localFont({
	variable: "--font-open-sauce-two",
	src: [
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-MediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-SemiBoldItalic.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../fonts/OpenSauceTwo/OpenSauceTwo-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "dark",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme,
					fontFamily: `${openSauceTwoFonts.style.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Source Han Sans, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
					fontFamilyMonospace: `JetBrains Mono VF, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`,
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<Loadbar />
				<Header />
				<Component {...pageProps} />
				<Footer />
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default App;
