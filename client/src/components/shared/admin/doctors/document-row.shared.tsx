import type { VerifyPlainUrl } from "@/types/common";
import { ExternalLink, FileText } from "lucide-react";
import { statusLabel, statusStyle } from "./clinic-card.shared";

export const DocumentRow = ({
  title,
  doc,
  canAct,
  onView,
  onAction,
}: {
  title: string;
  doc: VerifyPlainUrl;
  canAct: boolean;
  onView: () => void;
  onAction?: (action: "VERIFY" | "REJECT") => void;
}) => {
  const s = statusStyle(doc.status);
  const isApproved = doc.status === "APPROVED";
  const isRejected = doc.status === "REJECTED";

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-4 transition-colors hover:border-[#1dc465]/30">
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
            <p className="truncate text-xs font-semibold text-white">{title}</p>
            <p className="text-[10px] text-[#64748b]">Click to view document</p>
          </div>
        </div>
        <ExternalLink
          size={14}
          className="shrink-0 text-[#64748b] group-hover:text-white"
        />
      </button>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
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
              className="h-7 rounded-md border border-[#1dc465]/20 bg-[#1dc465]/5 px-2.5 text-[10px] font-semibold text-[#1dc465] hover:bg-[#1dc465]/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isRejected ? "Re-verify" : "Verify"}
            </button>
            <button
              type="button"
              disabled={isRejected}
              onClick={() => onAction("REJECT")}
              className="h-7 rounded-md border border-red-400/20 bg-red-400/5 px-2.5 text-[10px] font-semibold text-red-400 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
