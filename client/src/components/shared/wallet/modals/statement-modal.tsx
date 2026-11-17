
import React, { useState } from "react";
import { X, FileText, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface StatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const StatementModal: React.FC<StatementModalProps> = ({
  isOpen,
  onClose,
  isDark = false,
}) => {
  const [period, setPeriod] = useState("30d");
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success(
        `Wallet statement (${format.toUpperCase()}) downloaded successfully!`
      );
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl border space-y-5 ${
          isDark
            ? "bg-[#0D1A27] border-white/10"
            : "bg-white border-slate-200"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isExporting}
          className={`absolute right-4 top-4 p-2 rounded-xl transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-white/10"
              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3
              className={`text-base font-bold ${
                isDark ? "text-white" : "text-[#0D1A27]"
              }`}
            >
              Download Wallet Statement
            </h3>
            <p
              className={`text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Export verified financial logs for taxation or audit.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label
              className={`font-semibold ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Select Statement Period
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "30d", label: "Last 30 Days" },
                { id: "90d", label: "Last 90 Days" },
                { id: "fy", label: "FY 2026-27" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id)}
                  className={`py-2 px-2.5 rounded-lg border font-semibold text-center transition-all ${
                    period === p.id
                      ? "bg-primary/10 border-primary text-primary"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              className={`font-semibold ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Export File Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "pdf", label: "PDF Document (.pdf)" },
                { id: "csv", label: "Spreadsheet (.csv)" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id as "pdf" | "csv")}
                  className={`py-2 px-3 rounded-lg border font-semibold text-left transition-all ${
                    format === f.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className={`flex-1 py-2.5 rounded-xl border font-semibold text-xs transition-colors ${
              isDark
                ? "border-white/10 text-slate-300 hover:bg-white/5"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
