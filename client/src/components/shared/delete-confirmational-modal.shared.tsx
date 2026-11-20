import type { UpdateMethods } from "@/types/common";
import { Button } from "../ui/button";
import { Trash, XCircle } from "lucide-react";
import { MdRestoreFromTrash } from "react-icons/md";
import { createPortal } from "react-dom";

export interface DeleteModelProps {
  id: string;
  name: string;
  type: string;
  action: UpdateMethods;
  status: "ACTIVE" | "INACTIVE";
  service: () => void;
  closeDeleteBox: () => void;
  isDark: boolean;
}

function DeleteConfirmationalModal({
  name,
  type,
  action,
  service,
  closeDeleteBox,
  isDark,
}: DeleteModelProps) {
  const firstLetter = action[0];
  const updatedAction = firstLetter + action.toLowerCase().slice(1);

  const isDanger = action === "DELETE" || action === "BLOCK";

  const theme = {
    modal: isDark ? "border-white/10 bg-[#111827]" : "border-gray-200 bg-white",

    heading: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-400" : "text-gray-500",
    description: isDark ? "text-gray-400" : "text-gray-600",
    name: isDark ? "text-white" : "text-gray-900",

    closeButton: isDark
      ? "text-gray-400 hover:bg-white/5 hover:text-white"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",

    cancelButton: isDark
      ? "border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${theme.modal}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isDanger
                  ? "bg-rose-500/10 text-rose-500"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {isDanger ? (
                <Trash size={20} />
              ) : (
                <MdRestoreFromTrash size={22} />
              )}
            </div>

            <div>
              <h2 className={`text-base font-semibold ${theme.heading}`}>
                {updatedAction} {type}
              </h2>

              <p className={`text-xs ${theme.subtitle}`}>
                Please confirm this action
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeDeleteBox}
            className={`rounded-lg p-1 transition ${theme.closeButton}`}
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="mt-6">
          <p className={`text-sm leading-6 ${theme.description}`}>
            Are you sure you want to{" "}
            <span
              className={`font-semibold ${
                isDanger ? "text-rose-400" : "text-primary"
              }`}
            >
              {action.toLowerCase()}
            </span>{" "}
            <span className={`font-semibold ${theme.name}`}>{name}</span>?
          </p>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            onClick={closeDeleteBox}
            variant="outline"
            className={theme.cancelButton}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={service}
            className={
              isDanger
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-primary/75 text-black hover:bg-primary"
            }
          >
            {updatedAction}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteConfirmationalModal;
