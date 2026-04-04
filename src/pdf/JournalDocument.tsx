import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { JOURNAL_MARKERS } from "../data/markers";

/** RLI + PDI — isolates a string as one RTL run so `?` and neutrals stay at the true sentence end. */
function rtlIsolate(text: string): string {
  return `\u2067${text}\u2069`;
}

const styles = StyleSheet.create({
  page: {
    padding: 44,
    backgroundColor: "#f9f9f7",
    fontFamily: "NotoSansHebrew",
    direction: "rtl",
  },
  coverTitle: {
    fontSize: 22,
    marginBottom: 8,
    color: "#2d2d2a",
    textAlign: "right",
    direction: "rtl",
  },
  coverSub: {
    fontSize: 12,
    color: "#5c5c56",
    marginBottom: 28,
    textAlign: "right",
    direction: "rtl",
  },
  bar: {
    backgroundColor: "#8ca474",
    height: 4,
    marginBottom: 10,
    borderRadius: 2,
  },
  section: {
    marginBottom: 18,
    direction: "rtl",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2d2d2a",
    marginBottom: 6,
    textAlign: "right",
    direction: "rtl",
  },
  prompt: {
    fontSize: 10,
    color: "#6d6d68",
    marginBottom: 6,
    textAlign: "right",
    direction: "rtl",
  },
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#2d2d2a",
    textAlign: "right",
    direction: "rtl",
  },
  empty: {
    fontSize: 11,
    color: "#9a9a94",
    fontStyle: "italic",
    textAlign: "right",
    direction: "rtl",
  },
});

export function JournalDocument({ entries }: { entries: Record<string, string> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.coverTitle}>{rtlIsolate("מפת הרגשות שלי")}</Text>
        <Text style={styles.coverSub}>{rtlIsolate("מחרמון לאילת — מה כתבתי בדרך")}</Text>
        {JOURNAL_MARKERS.map((m) => {
          const text = entries[m.id]?.trim() ?? "";
          return (
            <View key={m.id} style={styles.section} wrap={false}>
              <View style={styles.bar} />
              <Text style={styles.sectionTitle}>{rtlIsolate(m.titleHe)}</Text>
              <Text style={styles.prompt}>{rtlIsolate(m.promptHe)}</Text>
              {text ? (
                <Text style={styles.body}>{rtlIsolate(text)}</Text>
              ) : (
                <Text style={styles.empty}>{rtlIsolate("ריק")}</Text>
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
