import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, RotateCcw, X } from "lucide-react";

interface ImagePreviewZoomProps {
  fileUrl: string | null;
  fileType: "image" | "pdf";
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ImagePreviewZoom: React.FC<ImagePreviewZoomProps> = ({
  fileUrl,
  fileType,
  isOpen,
  onClose,
  title = "Document Preview",
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
    }
  }, [isOpen, fileUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <AnimatePresence>
      {isOpen && fileUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[90vh] h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d1a27] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 shrink-0">
              <span className="text-sm font-medium text-white">{title}</span>

              <div className="flex items-center gap-2">
                {fileType === "image" && (
                  <>
                    <button
                      type="button"
                      onClick={zoomOut}
                      disabled={zoom <= 0.5}
                      className="rounded-lg p-2 text-white transition hover:bg-white/10 disabled:opacity-40"
                      title="Zoom out"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="min-w-12 text-center text-sm text-white">
                      {Math.round(zoom * 100)}%
                    </span>

                    <button
                      type="button"
                      onClick={zoomIn}
                      disabled={zoom >= 3}
                      className="rounded-lg p-2 text-white transition hover:bg-white/10 disabled:opacity-40"
                      title="Zoom in"
                    >
                      <Plus size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={resetZoom}
                      className="rounded-lg px-3 py-2 text-xs text-white transition hover:bg-white/10"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 text-white transition hover:bg-red-500/20 hover:text-red-400"
                  title="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 scrollbar-none custom-scrollbar scrollbar-dark min-h-0 overflow-auto bg-[#080f17]">
              {fileType === "pdf" ? (
                <iframe
                  src={fileUrl}
                  title={title}
                  className="h-full w-full border-0 bg-white"
                />
              ) : (
                <div className="scrollbar-none flex min-h-full min-w-full items-center justify-center overflow-auto p-6">
                  <motion.img
                    src={fileUrl}
                    alt={title}
                    animate={{ width: `${zoom * 100}%` }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    style={{
                      maxWidth: "none",
                      height: "auto",
                    }}
                    className="rounded-lg object-contain"
                    draggable={false}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewZoom;
