import type { Buffer } from "buffer";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

/** A4 dimensions (pt) — @react-pdf default. */
const PAGE_W = 595.28;
const PAGE_H = 841.89;

/**
 * Figma file `0BeD5FR4YhA5ciNUbnaLZC`, frame `emotional map pdf` (94:5) — artboard for export.
 * @see https://www.figma.com/design/0BeD5FR4YhA5ciNUbnaLZC/Icons?node-id=99-54
 */
const FIGMA_PAGE_W = 2480;
const FIGMA_PAGE_H = 3508;
/** Rounded rectangles in `txt boxes` (99:54) — same coordinates as parent artboard. */
const FIGMA_BOX_W = 744;
const FIGMA_BOX_H = 786;
/** Horizontal insets as fractions of box width: left 5%, right 10% (extra 5% from the inner right). */
const INSET_LEFT_W = 0.05;
const INSET_RIGHT_W = 0.1;
/** Vertical inset as fraction of box height (top & bottom). */
const INSET_Y = 0.05;

type Slot = { id: string; l: number; t: number; w: number; h: number };

function figmaBoxToSlot(figmaX: number, figmaY: number): Omit<Slot, "id"> {
  const l0 = figmaX / FIGMA_PAGE_W;
  const t0 = figmaY / FIGMA_PAGE_H;
  const w0 = FIGMA_BOX_W / FIGMA_PAGE_W;
  const h0 = FIGMA_BOX_H / FIGMA_PAGE_H;
  return {
    l: l0 + INSET_LEFT_W * w0,
    t: t0 + INSET_Y * h0,
    w: w0 * (1 - INSET_LEFT_W - INSET_RIGHT_W),
    h: h0 * (1 - 2 * INSET_Y),
  };
}

/**
 * Columns LTR x = 62, 868, 1674 — RTL reading order uses 1674 first (star-1 … fuel-1).
 * Rows y = 549, 1601, 2658 (green, coral, orange).
 */
const TEXT_SLOTS: Slot[] = [
  { id: "star-1", ...figmaBoxToSlot(1674, 549) },
  { id: "star-2", ...figmaBoxToSlot(868, 549) },
  { id: "star-3", ...figmaBoxToSlot(62, 549) },
  { id: "traffic-1", ...figmaBoxToSlot(1674, 1601) },
  { id: "traffic-2", ...figmaBoxToSlot(868, 1601) },
  { id: "traffic-3", ...figmaBoxToSlot(62, 1601) },
  { id: "fuel-1", ...figmaBoxToSlot(1674, 2658) },
  { id: "fuel-2", ...figmaBoxToSlot(868, 2658) },
  { id: "fuel-3", ...figmaBoxToSlot(62, 2658) },
];

/** Strip bidi / embedding controls that can corrupt PDF text if pasted into notes. */
function cleanPdfText(s: string): string {
  return s.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "").trim();
}

const styles = StyleSheet.create({
  stage: {
    width: PAGE_W,
    height: PAGE_H,
    position: "relative",
  },
  background: {
    width: PAGE_W,
    height: PAGE_H,
    objectFit: "fill",
  },
  /** Text area: top + physical right (Hebrew RTL start); slot uses 5% L / 10% R / 5% top-bottom insets. */
  cell: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  cellText: {
    width: "100%",
    fontSize: 13.5,
    lineHeight: 1.35,
    color: "#2a2a28",
    textAlign: "right",
    direction: "rtl",
    fontWeight: 400,
    fontFamily: "Heebo",
  },
});

function slotStyle(slot: Slot) {
  return {
    left: slot.l * PAGE_W,
    top: slot.t * PAGE_H,
    width: slot.w * PAGE_W,
    height: slot.h * PAGE_H,
  };
}

export function JournalDocument({
  entries,
  worksheetImage,
}: {
  entries: Record<string, string>;
  worksheetImage: { format: "jpg"; data: Buffer };
}) {
  return (
    <Document title="מפת הניווט הפנימי שלי" language="he">
      <Page size="A4" wrap={false}>
        <View style={styles.stage} wrap={false}>
          <Image
            src={worksheetImage}
            style={styles.background}
            cache={false}
          />

          {TEXT_SLOTS.map((slot) => {
            const raw = cleanPdfText(entries[slot.id] ?? "");
            if (!raw) return null;
            return (
              <View key={slot.id} style={[styles.cell, slotStyle(slot)]} wrap={false}>
                <Text style={styles.cellText}>{raw}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
