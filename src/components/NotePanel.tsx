import { useEffect, useRef } from "react";
import type { JournalMarker } from "../data/markers";
import "./NotePanel.css";

interface NotePanelProps {
  marker: JournalMarker | null;
  draft: string;
  onDraftChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export function NotePanel({
  marker,
  draft,
  onDraftChange,
  onSave,
  onClose,
}: NotePanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!marker) return;
    const t = requestAnimationFrame(() => textareaRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [marker]);

  useEffect(() => {
    if (!marker) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [marker, onClose]);

  if (!marker) return null;

  return (
    <div
      className="note-panel-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="note-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-panel-title"
      >
        <h2 id="note-panel-title" className="note-panel__title">
          {marker.titleHe}
        </h2>
        <p className="note-panel__prompt">{marker.promptHe}</p>
        <textarea
          ref={textareaRef}
          className="note-panel__textarea"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          rows={6}
          dir="rtl"
        />
        <div className="note-panel__actions">
          <button type="button" className="note-panel__btn note-panel__btn--ghost" onClick={onClose}>
            סגור
          </button>
          <button type="button" className="note-panel__btn note-panel__btn--primary" onClick={onSave}>
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}
