import { publicAsset } from "../lib/publicAsset";
import {
  FIGMA_MAP_HEIGHT,
  FIGMA_MAP_WIDTH,
  MAP_NATIVE_HEIGHT,
  MAP_NATIVE_WIDTH,
} from "./routeOverlay";

export type MarkerKind = "fuel" | "traffic" | "star";

/** Figma ellipse frame size for traffic/fuel vs star (scaled to `viewBox` for `<image>` width/height). */
const MARK_FIGMA_DIAMETER: Record<MarkerKind, number> = {
  fuel: 592,
  traffic: 592,
  star: 672,
};

/** Raster for each kind (`public/images/markers/`). */
export const MARK_ICON_SRC: Record<MarkerKind, string> = {
  fuel: publicAsset("images/markers/mark-fuel.png"),
  traffic: publicAsset("images/markers/mark-traffic.png"),
  star: publicAsset("images/markers/mark-star.png"),
};

export function markerDiameterViewBox(kind: MarkerKind): number {
  const d = MARK_FIGMA_DIAMETER[kind];
  return Math.max(1, Math.round((d * MAP_NATIVE_WIDTH) / FIGMA_MAP_WIDTH));
}

export interface JournalMarker {
  id: string;
  kind: MarkerKind;
  titleHe: string;
  promptHe: string;
  /** Center of the stop in map `viewBox` pixels (origin top-left of the map image). */
  x: number;
  y: number;
  /** Check badge offset from center; default applied in `IsraelRoadmap` if omitted. */
  checkDx?: number;
  checkDy?: number;
}

/**
 * Stop centers from Figma file `0BeD5FR4YhA5ciNUbnaLZC`, node `marks` (90:157).
 * Ellipse centers in Figma document space → scaled by FIGMA_MAP_* to match `viewBox` 430×1024.
 *
 * Group → kind: Ellipse 5 = traffic, Ellipse 6 = fuel, Ellipse 7 = star (north → south).
 */
function figmaToApp(cx: number, cy: number): { x: number; y: number } {
  return {
    x: Math.round((cx * MAP_NATIVE_WIDTH) / FIGMA_MAP_WIDTH),
    y: Math.round((cy * MAP_NATIVE_HEIGHT) / FIGMA_MAP_HEIGHT),
  };
}

const FIGMA_CENTERS: Record<string, [number, number]> = {
  // traffic-1 Group 3
  "traffic-1": [5138 + 296, 2649 + 296],
  // fuel-1 Group 4
  "fuel-1": [3990 + 296, 3785 + 296],
  // star-1 Group 5 (672 px)
  "star-1": [3188 + 336, 5065 + 336],
  // traffic-2 Group 6
  "traffic-2": [3278 + 296, 6905 + 296],
  // fuel-2 Group 7
  "fuel-2": [2214 + 296, 8505 + 296],
  // star-2 Group 8 (672)
  "star-2": [2606 + 336, 9897 + 336],
  // traffic-3 Group 9
  "traffic-3": [4009 + 296, 11417 + 296],
  // fuel-3 Group 10
  "fuel-3": [2470 + 296, 13609 + 296],
  // star-3 Group 11 (672)
  "star-3": [2942 + 336, 17881 + 336],
};

/** Nine stops: 3× fuel, 3× traffic, 3× star — journal order; positions from Figma `marks`. */
export const JOURNAL_MARKERS: JournalMarker[] = [
  {
    id: "fuel-1",
    kind: "fuel",
    titleHe: "תחנת דלק ראשונה",
    promptHe: "מה נותן לך כוח ואנרגיה בימים האלה?",
    ...figmaToApp(...FIGMA_CENTERS["fuel-1"]),
  },
  {
    id: "traffic-1",
    kind: "traffic",
    titleHe: "פקק ראשון",
    promptHe: "מה מרגיש לך כמו פקק או עצירה בדרך?",
    ...figmaToApp(...FIGMA_CENTERS["traffic-1"]),
  },
  {
    id: "star-1",
    kind: "star",
    titleHe: "נקודת עניין ראשונה",
    promptHe: "מה משהו שגילית על עצמך לאחרונה?",
    ...figmaToApp(...FIGMA_CENTERS["star-1"]),
  },
  {
    id: "fuel-2",
    kind: "fuel",
    titleHe: "תחנת דלק שנייה",
    promptHe: "מי או מה עוזר לך להרגיע את עצמך?",
    ...figmaToApp(...FIGMA_CENTERS["fuel-2"]),
  },
  {
    id: "traffic-2",
    kind: "traffic",
    titleHe: "פקק שני",
    promptHe: "איזה רגש או מחשבה מבלבלת אותך לפעמים?",
    ...figmaToApp(...FIGMA_CENTERS["traffic-2"]),
  },
  {
    id: "star-2",
    kind: "star",
    titleHe: "נקודת עניין שנייה",
    promptHe: "מה אתה או את מעריכים בעצמכם?",
    ...figmaToApp(...FIGMA_CENTERS["star-2"]),
  },
  {
    id: "fuel-3",
    kind: "fuel",
    titleHe: "תחנת דלק שלישית",
    promptHe: "מה אתם מקווים שיקרה בקרוב?",
    ...figmaToApp(...FIGMA_CENTERS["fuel-3"]),
  },
  {
    id: "traffic-3",
    kind: "traffic",
    titleHe: "פקק שלישי",
    promptHe: "מה היית רוצה לשחרר או לעזוב מאחור?",
    ...figmaToApp(...FIGMA_CENTERS["traffic-3"]),
  },
  {
    id: "star-3",
    kind: "star",
    titleHe: "נקודת עניין שלישית",
    promptHe: "מה עושה לכם חיוך בלב?",
    ...figmaToApp(...FIGMA_CENTERS["star-3"]),
  },
];
