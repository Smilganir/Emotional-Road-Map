/**
 * Checkmark overlay when a journal stop is saved (map uses composite art for stop circles).
 */
export function CheckBadge({ r = 11 }: { r?: number }) {
  return (
    <g>
      <circle r={r} fill="#8ca474" stroke="#ffffff" strokeWidth={2} />
      <path
        d={`M ${-r * 0.45} 0 L ${-r * 0.05} ${r * 0.35} L ${r * 0.5} ${-r * 0.35}`}
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}
