import { useCallback, useEffect, useState } from "react";
import { JOURNAL_MARKERS } from "../data/markers";

const STORAGE_KEY = "emotional-road-map-journal-v1";

function loadInitial(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function useJournal() {
  const [entries, setEntries] = useState<Record<string, string>>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* ignore quota */
    }
  }, [entries]);

  const setEntry = useCallback((id: string, text: string) => {
    setEntries((prev) => ({ ...prev, [id]: text }));
  }, []);

  const isComplete = useCallback(
    (id: string) => entries[id]?.trim().length > 0,
    [entries],
  );

  const completedCount = JOURNAL_MARKERS.filter((m) =>
    entries[m.id]?.trim().length,
  ).length;

  return { entries, setEntry, isComplete, completedCount };
}
