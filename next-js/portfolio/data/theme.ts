// ─── Shared accent palette ────────────────────────────────────────────────────
// Single source of truth used by Home (stats grid) and Skills (bento cards).
// Keys match the `id` field in data/skills.json.
//
// Opacity guide (all on #04050a background):
//  .08 bg → near-invisible. Use .15+ for card surfaces, .22+ for tags.
//  .25 border → barely visible. Use .40+ to read clearly.
//  .15 glow  → too faint for ambient. Use .30+ for perceptible glow.

export const ACCENT_COLORS: Record<
  string,
  { bg: string; border: string; text: string; glow: string; stripe: string }
> = {
  core:  { bg: "rgba(139,92,246,.15)",  border: "rgba(139,92,246,.45)",  text: "#c4b5fd", glow: "rgba(139,92,246,.30)", stripe: "#7c3aed" },
  ai:    { bg: "rgba(59,130,246,.15)",  border: "rgba(59,130,246,.45)",  text: "#93c5fd", glow: "rgba(59,130,246,.30)", stripe: "#2563eb" },
  data:  { bg: "rgba(16,185,129,.15)",  border: "rgba(16,185,129,.45)",  text: "#6ee7b7", glow: "rgba(16,185,129,.30)", stripe: "#059669" },
  infra: { bg: "rgba(245,158,11,.15)",  border: "rgba(245,158,11,.45)",  text: "#fcd34d", glow: "rgba(245,158,11,.30)", stripe: "#d97706" },
  ui:    { bg: "rgba(236,72,153,.15)",  border: "rgba(236,72,153,.45)",  text: "#f9a8d4", glow: "rgba(236,72,153,.30)", stripe: "#be185d" },
  db:    { bg: "rgba(20,184,166,.15)",  border: "rgba(20,184,166,.45)",  text: "#5eead4", glow: "rgba(20,184,166,.30)", stripe: "#0d9488" },
};

// Ordered list used by the stats grid in Home.tsx (cycles if there are more stats than entries)
export const STAT_ACCENTS = [
  ACCENT_COLORS.core,
  ACCENT_COLORS.ai,
  ACCENT_COLORS.data,
  ACCENT_COLORS.infra,
];
