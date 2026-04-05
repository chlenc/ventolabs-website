const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path with the Next.js basePath (for static export on GH Pages) */
export function asset(path: string): string {
  return `${base}${path}`;
}

/** Prefix an internal page link with basePath. Leaves hashes/externals untouched. */
export function href(path: string): string {
  if (path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:")) return path;
  return `${base}${path}`;
}
