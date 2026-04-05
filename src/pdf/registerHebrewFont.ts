import { Font } from "@react-pdf/renderer";

let registered = false;

function fontRoot(): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

function fontSrc(filename: string): string {
  const path = `${fontRoot()}fonts/${filename}`;
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).href;
  }
  return path;
}

/**
 * Official Heebo TTF from Google Fonts (via gstatic) — full Hebrew + Latin
 * punctuation. Variable / Hebrew-only subsets mis-mapped "," "?" and U+05BE as "&".
 */
export function registerHebrewFont() {
  if (registered) return;
  Font.register({
    family: "Heebo",
    fonts: [
      { src: fontSrc("Heebo-Regular.ttf"), fontWeight: 400 },
      { src: fontSrc("Heebo-Bold.ttf"), fontWeight: 700 },
    ],
  });
  registered = true;
}
