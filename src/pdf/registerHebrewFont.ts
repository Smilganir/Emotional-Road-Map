import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerHebrewFont() {
  if (registered) return;
  Font.register({
    family: "NotoSansHebrew",
    src: "/fonts/NotoSansHebrew-Regular.ttf",
  });
  registered = true;
}
