// DoctorSearchBar.tsx
import { useRef } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface DoctorSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const DoctorSearchBar = ({ value, onChange }: DoctorSearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full mb-6">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={17}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by doctor name or specialization"
        aria-label="Search doctors"
        className="
          w-full h-11 pl-10 pr-10 rounded-lg border border-gray-200
          bg-white text-sm text-gray-900 placeholder:text-gray-400
          outline-none transition-all duration-200
          focus:border-primary focus:ring-2 focus:ring-primary/15
          font-sans
        "
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </motion.button>
      )}
    </div>
  );
};

export default DoctorSearchBar;
