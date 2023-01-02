import { Locale } from "i18n/locales";

export type LanguageProps = {
	active: string;
	items: Record<string, Locale>;
};
