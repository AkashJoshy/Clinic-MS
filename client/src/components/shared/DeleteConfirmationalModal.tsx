import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash, X, XCircle } from "lucide-react";
import { MdRestore, MdRestoreFromTrash } from "react-icons/md";

export interface DeleteModelProps {
  id: string;  
  name: string;
  type: string;
  action: "DELETE" | "RESTORE",
  status: "ACTIVE" | "INACTIVE";
  service: (data: { id: string, status: "ACTIVE" | "INACTIVE" }) => void;
  closeDeleteBox: () => void;
}

function DeleteConfirmationalModal({
  id,
  name,
  status,
  type,
  action,
  service,
  closeDeleteBox,
}: DeleteModelProps) {

  const firstLetter = action[0]
  const updatedAction = firstLetter + action.toLowerCase().slice(1)

  return (
    <div>
      <div className="border w-[90%] sm:w-95
    md:w-105
    lg:w-105
    max-w-[95vw] rounded-2xl fixed top-55 overflow-hidden left-1/2 -translate-x-1/2 z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-4xl">
        <div className="w-105 rounded-2xl border border-white/10 bg-[#0d1a27] shadow-2xl overflow-hidden">
          <div className="flex p-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${action === "DELETE" ? ` bg-rose-500/10 mt-1` : ` bg-primary-600/10 mt-1` }`}>
              {
                action === "DELETE" ?
                <Trash size={18} className="text-rose-400" />
                :
                <MdRestoreFromTrash size={18} className="text-primary-400" />
              }
            </div>
            <h2 className="m-2">{updatedAction} {type}</h2>
            <button
              onClick={closeDeleteBox}
              className="ml-auto rounded-lg p-1.5 text-[#8b9ab0] hover:bg-white/10 hover:text-white transition"
            >
              <XCircle size={18} />
            </button>
          </div>
          <div className="border-t border-white/10" />
          <div className="p-3">
            <p className="text-sm text-[#c8d1dc] min-[320px]:w-62.5 min-[375px]:w-100">
              Are you sure you want to {action.toLocaleLowerCase()}{" "}
              <span className={` ${action === "DELETE" ? "bg-red-600" : "bg-primary"}  rounded p-0.5`}>{name}</span>?
            </p>
            <div className="p-2 mt-2 flex">
              <Button
                onClick={closeDeleteBox}
                className="bg-gray-500 hover:bg-gray-500 min-[320px]:ml-22 min-[375px]:ml-34 min-[425px]:ml-46 md:ml-auto"
              >
                Cancel
              </Button> 
              <Button
                onClick={() => {
                  service({id, status});
                }}
                className={`ml-2 ${action === "DELETE" ? `bg-rose-500 hover:bg-rose-600` : `bg-[#1dc465] hover:bg-primary-600` } `}
              >
                {updatedAction}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationalModal;
