import { Buffer } from "buffer";
import { pdf } from "@react-pdf/renderer";
import { JournalDocument } from "./JournalDocument";
import { registerHebrewFont } from "./registerHebrewFont";

function publicAssetsBaseUrl(): string {
  const origin = window.location.origin;
  const base = import.meta.env.BASE_URL || "/";
  const path = base.endsWith("/") ? base : `${base}/`;
  return `${origin}${path}`;
}

/** Raw JPEG bytes — more reliable in @react-pdf than huge data: URLs or absolute Image URLs. */
async function fetchWorksheetImage(url: string): Promise<{
  format: "jpg";
  data: Buffer;
}> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Worksheet image HTTP ${res.status}`);
  }
  const ab = await res.arrayBuffer();
  return { format: "jpg", data: Buffer.from(ab) };
}

export async function downloadJournalPdf(entries: Record<string, string>) {
  registerHebrewFont();
  const base = publicAssetsBaseUrl();
  const worksheetImage = await fetchWorksheetImage(
    `${base}images/pdf/worksheet-background.jpg`,
  );
  const blob = await pdf(
    <JournalDocument entries={entries} worksheetImage={worksheetImage} />,
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mapat-hanivut-hapnimi.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
