import { MAP_NATIVE_HEIGHT, MAP_NATIVE_WIDTH } from "../data/routeOverlay";
import {
  JOURNAL_MARKERS,
  MARK_ICON_SRC,
  markerDiameterViewBox,
  type JournalMarker,
} from "../data/markers";
import { CheckBadge } from "./MarkerIcons";

const MAP_IMG = "/images/map-emotional-base.jpg";

/** Tap target: generous hit area around each mark. */
const HIT_R = 38;

const DEFAULT_CHECK_DX = 13;
const DEFAULT_CHECK_DY = -13;

interface IsraelRoadmapProps {
  completedIds: Set<string>;
  onSelectMarker: (m: JournalMarker) => void;
}

export function IsraelRoadmap({ completedIds, onSelectMarker }: IsraelRoadmapProps) {
  const w = MAP_NATIVE_WIDTH;
  const h = MAP_NATIVE_HEIGHT;

  return (
    <div className="map-shell map-shell--illustrated">
      <svg
        className="map-svg"
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="100%"
        role="img"
        aria-label="מפת דרך מחרמון לאילת"
      >
        <defs>
          <clipPath id="mapIllustrationClip">
            <rect width={w} height={h} rx={14} ry={14} />
          </clipPath>
        </defs>

        <g clipPath="url(#mapIllustrationClip)">
          <image href={MAP_IMG} width={w} height={h} x={0} y={0} />

          {JOURNAL_MARKERS.map((m) => {
            const { x: cx, y: cy } = m;
            const checkDx = m.checkDx ?? DEFAULT_CHECK_DX;
            const checkDy = m.checkDy ?? DEFAULT_CHECK_DY;
            const done = completedIds.has(m.id);
            const d = markerDiameterViewBox(m.kind);
            const half = d / 2;
            const src = MARK_ICON_SRC[m.kind];
            return (
              <g
                key={m.id}
                transform={`translate(${cx},${cy})`}
                role="button"
                tabIndex={0}
                aria-label={`${m.titleHe}${done ? " — הושלם" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelectMarker(m)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectMarker(m);
                  }
                }}
              >
                <circle r={HIT_R} fill="transparent" pointerEvents="all" />
                <g pointerEvents="none">
                  <image
                    href={src}
                    xlinkHref={src}
                    x={-half}
                    y={-half}
                    width={d}
                    height={d}
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
                {done ? (
                  <g transform={`translate(${checkDx},${checkDy})`} pointerEvents="none">
                    <CheckBadge r={9} />
                  </g>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
