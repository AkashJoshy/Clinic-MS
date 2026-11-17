import { Button } from "@/components/ui/button";
import { CheckCircle, X, XCircle } from "lucide-react";

export interface DocumentVerificationModalProps {
  documentName: string;
  action: "VERIFY" | "REJECT";
  service: () => void;
  onClose: () => void;
  isLoading?: boolean;
  isDark: boolean;
}

const DocumentVerificationModal = ({
  documentName,
  action,
  service,
  onClose,
  isLoading = false,
  isDark,
}: DocumentVerificationModalProps) => {
  const isReject = action === "REJECT";

  const theme = {
    modal: isDark
      ? "border-white/10 bg-[#111827]"
      : "border-gray-200 bg-white",

    heading: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-400" : "text-gray-500",
    description: isDark ? "text-gray-400" : "text-gray-600",
    documentName: isDark ? "text-white" : "text-gray-900",
    note: "text-gray-500",

    closeButton: isDark
      ? "text-gray-400 hover:bg-white/5 hover:text-white"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

    cancelButton: isDark
      ? "border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${theme.modal}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isReject
                  ? "bg-rose-500/10 text-rose-400"
                  : "bg-[#1dc465]/10 text-[#1dc465]"
              }`}
            >
              {isReject ? (
                <XCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
            </div>

            <div>
              <h2 className={`text-base font-semibold ${theme.heading}`}>
                {isReject ? "Reject Document" : "Verify Document"}
              </h2>

              <p className={`text-xs ${theme.subtitle}`}>
                Please confirm this action
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className={`rounded-lg p-1 transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.closeButton}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Confirmation Message */}
        <div className="mt-6">
          <p className={`text-sm leading-6 ${theme.description}`}>
            Are you sure you want to{" "}
            <span
              className={`font-semibold ${
                isReject ? "text-rose-400" : "text-[#1dc465]"
              }`}
            >
              {isReject ? "reject" : "verify"}
            </span>{" "}
            the document{" "}
            <span className={`font-semibold ${theme.documentName}`}>
              {documentName}
            </span>
            ?
          </p>

          <p className={`mt-3 text-xs leading-5 ${theme.note}`}>
            {isReject
              ? "The doctor will be notified that this document requires correction or re-upload."
              : "This document will be marked as verified."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className={theme.cancelButton}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={service}
            disabled={isLoading}
            className={
              isReject
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-[#1dc465] text-black hover:bg-[#18ad58]"
            }
          >
            {isLoading
              ? "Processing..."
              : isReject
                ? "Reject Document"
                : "Verify Document"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerificationModal;