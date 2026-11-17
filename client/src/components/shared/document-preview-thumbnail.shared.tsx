import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, ZoomIn } from "lucide-react";

interface DocumentPreviewThumbnailProps {
  previewUrl: string | null;
  previewType: "image" | "pdf";
  isDark: boolean;
  onPreview: () => void;
  title?: string;
}

const DocumentPreviewThumbnail: React.FC<DocumentPreviewThumbnailProps> = ({
  previewUrl,
  previewType,
  isDark,
  onPreview,
  title = "Click to preview document",
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={previewUrl ? `${previewType}-preview` : "empty"}
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="flex items-center justify-center min-h-20"
      >
        {previewUrl ? (
          <button
            type="button"
            onClick={onPreview}
            title={title}
            className="group relative rounded-lg cursor-zoom-in"
          >
            {previewType === "image" ? (
              <img
                src={previewUrl}
                alt="Document Preview"
                className="w-20 h-14 object-cover rounded-lg border border-white/10 shadow-sm"
              />
            ) : (
              <div
                className={`w-20 h-14 rounded-lg border flex flex-col items-center justify-center gap-1 ${
                  isDark
                    ? "bg-[#060c13] border-white/10 text-[#8b9ab0]"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                <FileText size={22} className="text-primary" />
                <span className="text-[9px] font-semibold">PDF DOCUMENT</span>
              </div>
            )}

            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={20} className="text-white" />
            </span>
          </button>
        ) : (
          <div
            className={`w-20 h-14 rounded-lg border border-dashed flex flex-col items-center justify-center gap-1 ${
              isDark
                ? "border-white/15 bg-white/[0.03] text-[#6b7c93]"
                : "border-gray-300 bg-gray-50 text-gray-400"
            }`}
          >
            <FileText size={18} />
            <span className="text-[9px] font-medium">No document</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentPreviewThumbnail;
