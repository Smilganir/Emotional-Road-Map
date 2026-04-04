import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerHebrewFont() {
  if (registered) return;
  const fontUrl = `${import.meta.env.BASE_URL}fonts/NotoSansHebrew-Regular.ttf`;
  Font.register({
    family: "NotoSansHebrew",
    src: fontUrl,
  });
  registered = true;
}
