import { pdf } from "@react-pdf/renderer";
import { JournalDocument } from "./JournalDocument";
import { registerHebrewFont } from "./registerHebrewFont";

export async function downloadJournalPdf(entries: Record<string, string>) {
  registerHebrewFont();
  const blob = await pdf(<JournalDocument entries={entries} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mapat-haderech.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
