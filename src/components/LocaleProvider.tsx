"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, htmlLangCodes, parseLocaleFromPath, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

/**
 * LocaleProvider reads the current pathname, resolves the active locale from
 * the URL structure (e.g. /es/..., /ru/..., /de/... — default /... is English),
 * and provides it to descendant client components. It also keeps the
 * <html lang> attribute in sync.
 *
 * An explicit `locale` prop overrides detection — useful when static-rendering
 * a locale-prefixed tree so the server and first-paint agree on the language.
 */
export function LocaleProvider({
  locale: explicitLocale,
  children,
}: {
  locale?: Locale;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const detected = useMemo(() => parseLocaleFromPath(pathname).locale, [pathname]);
  const locale = explicitLocale ?? detected;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLangCodes[locale];
    }
  }, [locale]);

  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
