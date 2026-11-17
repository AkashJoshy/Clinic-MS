import { X } from "lucide-react";
import type { DocumentPreviewModalProps } from "@/types/admin";

const DocumentPreviewModal = ({
  previewImage,
  onClose,
  isDark,
}: DocumentPreviewModalProps) => {
  if (!previewImage) return null;

  const isPdf = previewImage.toLowerCase().endsWith(".pdf");

  const theme = {
    overlay: isDark ? "bg-[#080d14]/90" : "bg-gray-900/50",
    modal: isDark
      ? "border-white/8 bg-[#0d1a27]"
      : "border-gray-200 bg-white",
    documentBackground: isDark ? "bg-[#080d14]/30" : "bg-gray-100",
    closeButton: isDark
      ? "bg-[#080d14]/70 text-white hover:bg-rose-500"
      : "bg-gray-200/90 text-gray-700 hover:bg-rose-500 hover:text-white",
  };

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-md sm:p-8 ${theme.overlay}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border p-2 shadow-2xl ${theme.modal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full backdrop-blur-md transition-all ${theme.closeButton}`}
          aria-label="Close document preview"
        >
          <X size={20} />
        </button>

        <div
          className={`max-h-[85vh] overflow-auto rounded-xl ${theme.documentBackground}`}
        >
          {isPdf ? (
            <iframe
              src={previewImage}
              title="Document preview"
              className="h-[85vh] w-full"
            />
          ) : (
            <img
              src={previewImage}
              alt="Document preview"
              className="max-h-[85vh] w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;