import en from './locales/en';
import ko from './locales/ko';
import type { Translation } from './locales/en';

const locales = {
	en,
	ko,
} as const;

export type Locale = keyof typeof locales;
export type { Translation };

export const availableLocales = Object.keys(locales) as Locale[];

function isLocale(value: string): value is Locale {
	return value in locales;
}

export function getTranslation(lang: string): Translation {
	return isLocale(lang) ? locales[lang] : locales.ko;
}

let currentLanguage: Locale = 'en';
let currentTranslation: Translation = locales[currentLanguage];

export function setLanguage(lang: string) {
	currentTranslation = getTranslation(lang);
	currentLanguage = isLocale(lang) ? lang : 'ko';
}

export function getCurrentTranslation(): Translation {
	return currentTranslation;
}

export function t(): Translation {
	return currentTranslation;
}
