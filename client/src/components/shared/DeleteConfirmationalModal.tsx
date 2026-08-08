import type { UpdateMethods } from "@/types/common";
import { Button } from "../ui/button";
import { Trash, XCircle } from "lucide-react";
import { MdRestoreFromTrash } from "react-icons/md";

export interface DeleteModelProps {
  id: string;
  name: string;
  type: string;
  action: UpdateMethods;
  status: "ACTIVE" | "INACTIVE";
  service: () => void;
  closeDeleteBox: () => void;
}

function DeleteConfirmationalModal({
  name,
  type,
  action,
  service,
  closeDeleteBox,
}: DeleteModelProps) {
  const firstLetter = action[0];
  const updatedAction =
    firstLetter + action.toLowerCase().slice(1);

  const isDanger = action === "DELETE" || action === "BLOCK";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isDanger
                  ? "bg-rose-500/10 text-rose-500"
                  : "bg-primary-600/10 text-primary"
              }`}
            >
              {isDanger ? (
                <Trash size={20} />
              ) : (
                <MdRestoreFromTrash size={22} />
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                {updatedAction} {type}
              </h2>

              <p className="text-xs text-gray-400">
                Please confirm this action
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={closeDeleteBox}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <XCircle size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <p className="text-sm leading-6 text-gray-400">
            Are you sure you want to{" "}
            <span
              className={`font-semibold ${
                isDanger ? "text-rose-400" : "text-primary"
              }`}
            >
              {action.toLowerCase()}
            </span>{" "}
            <span className="font-semibold text-white">
              {name}
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            onClick={closeDeleteBox}
            variant="outline"
            className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={service}
            className={
              isDanger
                ? "bg-rose-500 text-white hover:bg-rose-600"
                : "bg-[#1dc465] text-black hover:bg-primary-600"
            }
          >
            {updatedAction}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationalModal;