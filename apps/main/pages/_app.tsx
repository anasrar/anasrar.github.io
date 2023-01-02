import { FC } from "react";
import type { AppProps } from "next/app";
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
					fontFamily: `Open Sauce Two, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Source Han Sans, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
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
