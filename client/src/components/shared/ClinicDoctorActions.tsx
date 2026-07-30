import React, { useState, useEffect, useCallback } from "react";
import { MoveRight, Trash2, X, TriangleAlert } from "lucide-react";

/**
 * Drop-in replacement for the CLINIC-role action row.
 * Usage:
 * <ClinicDoctorActions
 *   doctorClinic={doctorClinic}
 *   doctorName={doctorClinic.name}
 *   onEdit={() => navigate(`/clinic/doctors/${doctorClinic.id}`)}
 *   onConfirmDelete={async () => { await deleteDoctor(doctorClinic.id); }}
 * />
 */
const ClinicDoctorActions = ({ doctorClinic, doctorName, onEdit, onConfirmDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const closeModal = useCallback(() => {
    if (isDeleting) return; // don't allow closing mid-request
    setIsModalOpen(false);
    setConfirmText("");
  }, [isDeleting]);

  // close on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, closeModal]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirmDelete?.(doctorClinic?.id);
      setIsModalOpen(false);
      setConfirmText("");
    } catch (err) {
      // let the parent surface a toast; just stop the spinner here
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const requiredWord = "DELETE";
  const canDelete = confirmText.trim().toUpperCase() === requiredWord;

  return (
    <>
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer group flex items-center gap-1.5 text-sm font-medium text-white/40 transition-colors duration-200 hover:text-red-400"
        >
          <Trash2 size={15} className="transition-transform duration-200 group-hover:scale-110" />
          <span>Remove</span>
        </button>

        <button
          onClick={onEdit}
          className="cursor-pointer group flex items-center gap-2 text-sm font-semibold text-[#1dc465] transition-all duration-200 hover:gap-3 hover:text-[#27d873]"
        >
          <span>Edit Details</span>
          <MoveRight
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={closeModal}
          />

          {/* modal */}
          <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#141518] shadow-2xl shadow-black/50 animate-[popIn_0.18s_ease-out]">
            <div className="p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <TriangleAlert size={18} className="text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="delete-modal-title" className="text-[15px] font-semibold text-white">
                    Remove {doctorName ? doctorName : "this doctor"}?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    This permanently removes them from your clinic roster along with their
                    schedule and profile. This can't be undone.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  disabled={isDeleting}
                  className="flex-shrink-0 text-white/30 hover:text-white/70 transition-colors disabled:opacity-40"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-medium text-white/40 mb-1.5">
                  Type <span className="text-white/70 font-semibold">DELETE</span> to confirm
                </label>
                <input
                  autoFocus
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  disabled={isDeleting}
                  placeholder="DELETE"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-red-400/50 focus:bg-white/[0.05] disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-t border-white/5 px-6 py-4">
              <button
                onClick={closeModal}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!canDelete || isDeleting}
                className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-500/25 disabled:text-white/40"
              >
                {isDeleting ? "Removing…" : "Remove doctor"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default ClinicDoctorActions;