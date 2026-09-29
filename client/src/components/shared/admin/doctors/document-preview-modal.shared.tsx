import { X } from "lucide-react";
import type { DocumentPreviewModalProps } from "@/types/admin";

const DocumentPreviewModal = ({
  previewImage,
  onClose,
}: DocumentPreviewModalProps) => {
  if (!previewImage) return null;

  const isPdf = previewImage.toLowerCase().endsWith(".pdf");

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#080d14]/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/8 bg-[#0d1a27] p-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-[#080d14]/50 text-white backdrop-blur-md transition-all hover:bg-rose-500"
          aria-label="Close document preview"
        >
          <X size={20} />
        </button>

        <div className="max-h-[85vh] overflow-auto rounded-xl bg-[#080d14]/30">
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