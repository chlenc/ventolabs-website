import { defaultLocale, localizedPath, type Locale } from "./i18n";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path with the Next.js basePath (for static export on GH Pages) */
export function asset(path: string): string {
  return `${base}${path}`;
}

/** Prefix an internal page link with basePath. Leaves hashes/externals untouched. */
export function href(path: string, locale: Locale = defaultLocale): string {
  if (path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:")) return path;
  return `${base}${localizedPath(path, locale)}`;
}

/**
 * Pages that funnel to a single conversion goal (call or email) and must
 * suppress all competing CTAs, popups, and floating widgets. Match against
 * `usePathname()` output (already locale-prefixed).
 */
export function isFocusFunnelPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return /\/cases\/erp-agent\/?$/.test(pathname);
}
