/** Prefix a path with the Next.js basePath (for static export on GH Pages) */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
