// @polara-health/brand — signature lifecycle badge map.
// Seven states, seven distinct appearances (WCAG 1.4.1: never color alone —
// each state carries a glyph AND its name in the accessible label).
export type SignatureStatus =
  | "PENDING" | "SENT" | "VIEWED" | "COMPLETED" | "DECLINED" | "VOIDED" | "EXPIRED";

export const statusBadges: Record<
  SignatureStatus,
  { label: string; glyph: string; className: string }
> = {
  PENDING:   { label: "Pending",  glyph: "\u25CB", className: "bg-white text-polara-gray-700 border border-polara-gray-200" },
  SENT:      { label: "Sent",     glyph: "\u2192", className: "bg-polara-info-fill text-polara-info-text" },
  VIEWED:    { label: "Viewed",   glyph: "\u25C9", className: "bg-[#eef3f8] text-polara-deepblue" },
  COMPLETED: { label: "Signed",   glyph: "\u2713", className: "bg-polara-success-fill text-polara-success-text" },
  DECLINED:  { label: "Declined", glyph: "\u2715", className: "bg-polara-danger-fill text-polara-danger-text" },
  VOIDED:    { label: "Voided",   glyph: "\u2014", className: "bg-polara-gray-100 text-polara-gray-700" },
  EXPIRED:   { label: "Expired",  glyph: "\u25F7", className: "bg-polara-warning-fill text-polara-warning-text" },
};

// Usage:
//   const s = statusBadges[status];
//   <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", s.className)}
//         aria-label={`Status: ${s.label}`}>
//     <span aria-hidden="true">{s.glyph}</span>{s.label}
//   </span>
