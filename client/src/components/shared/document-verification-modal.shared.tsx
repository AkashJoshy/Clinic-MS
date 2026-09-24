import { Button } from "@/components/ui/button";
import { CheckCircle, X, XCircle } from "lucide-react";

export interface DocumentVerificationModalProps {
  documentName: string;
  action: "VERIFY" | "REJECT";
  service: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const DocumentVerificationModal = ({
  documentName,
  action,
  service,
  onClose,
  isLoading = false,
}: DocumentVerificationModalProps) => {
  const isReject = action === "REJECT";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
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
              <h2 className="text-base font-semibold text-white">
                {isReject ? "Reject Document" : "Verify Document"}
              </h2>

              <p className="text-xs text-gray-400">
                Please confirm this action
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm leading-6 text-gray-400">
            Are you sure you want to{" "}
            <span
              className={`font-semibold ${
                isReject ? "text-rose-400" : "text-[#1dc465]"
              }`}
            >
              {isReject ? "reject" : "verify"}
            </span>{" "}
            the document{" "}
            <span className="font-semibold text-white">
              {documentName}
            </span>
            ?
          </p>

          {isReject ? (
            <p className="mt-3 text-xs leading-5 text-gray-500">
              The doctor will be notified that this document requires
              correction or re-upload.
            </p>
          ) : (
            <p className="mt-3 text-xs leading-5 text-gray-500">
              This document will be marked as verified.
            </p>
          )}
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={() => {
                console.log(`Clickedd`)
                service()
            }}
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