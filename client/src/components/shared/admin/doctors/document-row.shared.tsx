import type { VerifyPlainUrl } from "@/types/common";
import { ExternalLink, FileText } from "lucide-react";
import { statusLabel, statusStyle } from "./clinic-card.shared";

interface DocumentRowProps {
  title: string;
  doc: VerifyPlainUrl;
  canAct: boolean;
  isDark?: boolean;
  onView: () => void;
  onAction?: (action: "VERIFY" | "REJECT") => void;
}

export const DocumentRow = ({
  title,
  doc,
  canAct,
  isDark = true,
  onView,
  onAction,
}: DocumentRowProps) => {
  const s = statusStyle(doc.status);
  const isApproved = doc.status === "APPROVED";
  const isRejected = doc.status === "REJECTED";

  const theme = {
    container: isDark
      ? "border-white/8 bg-white/[0.02] hover:border-[#1dc465]/30"
      : "border-gray-200 bg-gray-50 hover:border-[#1dc465]/40",

    title: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-[#64748b]" : "text-gray-500",

    externalLink: isDark
      ? "text-[#64748b] group-hover:text-white"
      : "text-gray-400 group-hover:text-gray-700",

    divider: isDark ? "border-white/5" : "border-gray-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${theme.container}`}
    >
      {/* Document Preview */}
      <button
        type="button"
        onClick={onView}
        className="group flex w-full items-center justify-between gap-3 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1dc465]/10">
            <FileText size={18} className="text-[#1dc465]" />
          </div>

          <div className="min-w-0">
            <p className={`truncate text-xs font-semibold ${theme.title}`}>
              {title}
            </p>

            <p className={`text-[10px] ${theme.description}`}>
              Click to view document
            </p>
          </div>
        </div>

        <ExternalLink
          size={14}
          className={`shrink-0 transition-colors ${theme.externalLink}`}
        />
      </button>

      {/* Status and Actions */}
      <div
        className={`mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3 ${theme.divider}`}
      >
        <span
          className={`inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold ${s.badge}`}
        >
          <span className={`size-1.5 rounded-full ${s.dot}`} />
          {statusLabel(doc.status)}
        </span>

        {canAct && onAction && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={isApproved}
              onClick={() => onAction("VERIFY")}
              className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] transition-colors hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isRejected ? "Re-verify" : "Verify"}
            </button>

            <button
              type="button"
              disabled={isRejected}
              onClick={() => onAction("REJECT")}
              className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 transition-colors hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};