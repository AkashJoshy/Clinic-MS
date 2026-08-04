import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import AddProfile from "./AddProfile";

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProfileModal: React.FC<AddProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="overflow-auto fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
              onClick={onClose}
            >
              <X className="cursor-pointer" size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlusCircle size={20} className="text-emerald-500" />
              Add New Profile
            </h2>
            <AddProfile onClose={onClose} isSubmit={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AddProfileModal;