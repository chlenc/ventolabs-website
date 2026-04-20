import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { ru } from "./dictionaries/ru";
import { de } from "./dictionaries/de";
import type { Dictionary } from "./types";

export const locales = ["en", "es", "ru", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
};

export const localeShortCodes: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  ru: "RU",
  de: "DE",
};

export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ru: "ru_RU",
  de: "de_DE",
};

export const htmlLangCodes: Record<Locale, string> = {
  en: "en",
  es: "es",
  ru: "ru",
  de: "de",
};

const dictionaries: Record<Locale, Dictionary> = { en, es, ru, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isValidLocale(x: unknown): x is Locale {
  return typeof x === "string" && (locales as readonly string[]).includes(x);
}

/** Non-default locales (all except English) — for [lang] route generation */
export const nonDefaultLocales: Locale[] = locales.filter((l) => l !== defaultLocale);

/**
 * Parse the current pathname and return the active locale + the route path
 * *without* the locale prefix. English pages live at the root (no prefix).
 *
 * Examples:
 *   "/"                    -> { locale: "en", path: "/" }
 *   "/cases/"              -> { locale: "en", path: "/cases" }
 *   "/es/"                 -> { locale: "es", path: "/" }
 *   "/ru/services/foo/"    -> { locale: "ru", path: "/services/foo" }
 */
export function parseLocaleFromPath(pathname: string): { locale: Locale; path: string } {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  let p = pathname;
  if (base && p.startsWith(base)) p = p.slice(base.length);
  if (!p.startsWith("/")) p = "/" + p;
  const segments = p.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isValidLocale(first) && first !== defaultLocale) {
    const rest = "/" + segments.slice(1).join("/");
    return { locale: first, path: rest === "/" ? "/" : rest.replace(/\/$/, "") };
  }
  return { locale: defaultLocale, path: p === "/" ? "/" : p.replace(/\/$/, "") };
}

/**
 * Build a localized href. English routes stay at root; other locales get a
 * `/[lang]` prefix. Hashes, externals, and mailtos are left untouched.
 * The basePath (for GH Pages) is prepended by the existing `href()` helper.
 */
export function localizedPath(path: string, locale: Locale): string {
  if (path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:")) {
    return path;
  }
  if (locale === defaultLocale) return path;
  // Avoid double prefix if already localized
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/**
 * Given a path (maybe with locale prefix) and a target locale, return a path
 * pointing at the same page in that locale. Used by the language switcher.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { path } = parseLocaleFromPath(pathname);
  return localizedPath(path, target);
}

export type { Dictionary } from "./types";
