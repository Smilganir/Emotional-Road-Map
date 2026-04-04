/**
 * URL for a file in `public/` (works with Vite `base`, e.g. GitHub Pages `/RepoName/`).
 * Pass path without leading slash: `images/foo.png`.
 */
export function publicAsset(path: string): string {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${p}`;
}
