import { useEffect, useMemo, useRef, useState } from "react";
import { IsraelRoadmap } from "./components/IsraelRoadmap";
import { NotePanel } from "./components/NotePanel";
import { JOURNAL_MARKERS, type JournalMarker } from "./data/markers";
import { useJournal } from "./hooks/useJournal";
import { fireCompletionConfetti } from "./lib/confettiBurst";
import "./App.css";

const TOTAL_STOPS = JOURNAL_MARKERS.length;

export default function App() {
  const { entries, setEntry, completedCount } = useJournal();
  const [active, setActive] = useState<JournalMarker | null>(null);
  const [draft, setDraft] = useState("");
  const allStopsComplete = completedCount === TOTAL_STOPS;
  const mounted = useRef(false);
  const prevAllComplete = useRef(allStopsComplete);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prevAllComplete.current = allStopsComplete;
      return;
    }
    if (allStopsComplete && !prevAllComplete.current) {
      fireCompletionConfetti(2500);
    }
    prevAllComplete.current = allStopsComplete;
  }, [allStopsComplete]);

  const completedIds = useMemo(
    () => new Set(JOURNAL_MARKERS.filter((m) => entries[m.id]?.trim()).map((m) => m.id)),
    [entries],
  );

  const openMarker = (m: JournalMarker) => {
    setActive(m);
    setDraft(entries[m.id] ?? "");
  };

  const closePanel = () => {
    setActive(null);
  };

  const saveDraft = () => {
    if (!active) return;
    setEntry(active.id, draft);
    setActive(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__intro">
            <h1 className="app-title">מפת הרגשות שלי</h1>
            <p className="app-lead">
              מסע מחרמון לאילת. לחצו על התחנות לאורך הדרך, כתבו מה עולה בלב — ושמרו. בסוף אפשר להוריד הכל כ־PDF
              ואפילו להדפיס.
            </p>
          </div>
          <div className="app-header__toolbar">
            <span className="app-progress" aria-live="polite">
              {completedCount}/{TOTAL_STOPS} עצירות
            </span>
            <button
              type="button"
              className={
                allStopsComplete ? "btn-export btn-export--ready" : "btn-export btn-export--muted"
              }
              onClick={async () => {
                try {
                  const { downloadJournalPdf } = await import("./pdf/exportPdf");
                  await downloadJournalPdf(entries);
                } catch {
                  window.alert("לא ניתן ליצור את ה־PDF. בדקו את החיבור ורעננו את הדף.");
                }
              }}
            >
              ייצוא PDF
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <IsraelRoadmap completedIds={completedIds} onSelectMarker={openMarker} />
      </main>

      <footer className="app-footer">
        <p>
          מפת רקע מאוירת (סגנון נקי); צבעי מסלול וכפתורים תואמים את ערכת הצבעים של האפליקציה. נתוני שטח
          מוצגים לצורכי חוויית משתמש בלבד.
        </p>
      </footer>

      <NotePanel
        marker={active}
        draft={draft}
        onDraftChange={setDraft}
        onSave={saveDraft}
        onClose={closePanel}
      />
    </div>
  );
}
