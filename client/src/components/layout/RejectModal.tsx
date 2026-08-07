import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface RejectModalProps<T> {
  id: string;
  name: string;
  onConfirm: (reason: string) => void;
  onClose: () => void;
  mutateFn: (data: T) =>  void | Promise<void>
}

export const RejectModal = <T,>({
  id,
  name,
  onConfirm,
  onClose,
  mutateFn,
}: RejectModalProps<T>) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0d1a27] border border-white/10 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-rose-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">
              Reject Clinic
            </h3>
            <p className="text-[#8b9ab0] text-sm mt-0.5">
              You are rejecting{" "}
              <span className="text-white font-medium">{name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-[#8b9ab0] hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-[#c0ccd8] mb-2">
            Reason for Rejection <span className="text-rose-400">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value.trim()) setError(false);
            }}
            rows={4}
            placeholder="e.g. Missing license documents, incomplete registration details..."
            className={`w-full bg-[#080d14] border rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5568]
              resize-none outline-none transition-colors duration-150
              ${error ? "border-rose-500/60 focus:border-rose-500" : "border-white/10 focus:border-[#1dc465]/50"}`}
          />
          {error && (
            <p className="mt-1.5 text-xs text-rose-400">
              Please provide a reason before rejecting.
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#8b9ab0] hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!reason.trim()) {
                setError(true);
                return;
              }
              mutateFn({ id: id, reviewMessage: reason.trim() } as T)
              onConfirm(reason.trim())
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-all duration-150 cursor-pointer"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};
