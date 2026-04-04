import { useMemo, useState } from "react";
import { IsraelRoadmap } from "./components/IsraelRoadmap";
import { NotePanel } from "./components/NotePanel";
import { JOURNAL_MARKERS, type JournalMarker } from "./data/markers";
import { useJournal } from "./hooks/useJournal";
import "./App.css";

export default function App() {
  const { entries, setEntry, completedCount } = useJournal();
  const [active, setActive] = useState<JournalMarker | null>(null);
  const [draft, setDraft] = useState("");

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
          <div>
            <h1 className="app-title">מפת הרגשות שלי</h1>
            <p className="app-lead">
              מסע מחרמון לאילת. לחצו על התחנות לאורך הדרך, כתבו מה עולה בלב — ושמרו. בסוף אפשר להוריד הכל כ־PDF
              ואפילו להדפיס.
            </p>
          </div>
          <div className="app-header__actions">
            <span className="app-progress" aria-live="polite">
              {completedCount}/{JOURNAL_MARKERS.length} עצירות
            </span>
            <button
              type="button"
              className="btn-export"
              onClick={async () => {
                const { downloadJournalPdf } = await import("./pdf/exportPdf");
                await downloadJournalPdf(entries);
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
