const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "vl_utm";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Parse UTM params from current URL and persist in sessionStorage */
export function captureUtm(): UtmParams {
  if (typeof window === "undefined") return {};

  const url = new URL(window.location.href);
  const fresh: UtmParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const val = url.searchParams.get(key);
    if (val) {
      fresh[key] = val;
      hasAny = true;
    }
  }

  // If URL has UTM params, save them (overwrite previous)
  if (hasAny) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  }

  // Otherwise return previously stored params
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** Get stored UTM params without re-parsing URL */
export function getUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
