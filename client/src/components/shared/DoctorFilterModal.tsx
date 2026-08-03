import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, RefreshCcw, Stethoscope, Circle } from "lucide-react";
import { Button } from "../ui/button";

type DepartmentDetails = {
  id: string;
  name: string;
};

export interface DoctorFilterState {
  gender: "ALL" | "MALE" | "FEMALE" | "OTHERS" | "PREFER NOT TO SAY";
  department: DepartmentDetails[];
  sortBy: "NEWEST" | "OLDEST" | "NAME_ASC" | "NAME_DESC";
}

export const defaultDoctorFilters: DoctorFilterState = {
  gender: "ALL",
  department: [{ id: "1", name: "ALL" }],
  sortBy: "NEWEST",
};

export interface DoctorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: DoctorFilterState;
  onApplyFilters: (filters: DoctorFilterState) => void;
  departments: DepartmentDetails[];
}

const SegmentedControl: React.FC<{
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex gap-2">
    {options.map((opt) => {
      const active = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-[13px] rounded-[10px] border transition-all ${
            active
              ? "bg-[#1dc465]/10 border-[#1dc465]/40 text-[#1dc465] font-semibold"
              : "bg-[#080d14] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/20"
          }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      );
    })}
  </div>
);

const RadioCard: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, checked, onChange }) => (
  <label
    className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] rounded-[10px] border cursor-pointer transition-all ${
      checked
        ? "bg-[#1dc465]/10 border-[#1dc465]/40 text-[#1dc465] font-semibold"
        : "bg-[#080d14] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/20"
    }`}
  >
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      className="accent-[#1dc465] w-3.5 h-3.5"
    />
    {label}
  </label>
);

export const DoctorFilterModal: React.FC<DoctorFilterModalProps> = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
  departments,
}) => {
  const [localFilters, setLocalFilters] =
    useState<DoctorFilterState>(initialFilters);

  useEffect(() => {
    if (isOpen) setLocalFilters(initialFilters);
  }, [isOpen, initialFilters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => setLocalFilters(defaultDoctorFilters);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed -inset-6.25 bg-black/30 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
            className="
              fixed z-[101] flex flex-col overflow-hidden
              bg-[#0d1a27] border border-white/8 shadow-2xl

              /* Mobile: centered modal */
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[92vw] max-w-[440px] rounded-[16px] max-h-[88vh]
            "
          >
            <div className="px-5 py-4 border-b border-white/8 shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight leading-none">
                    Filter doctors
                  </h2>
                  <p className="text-[13px] text-[#8b9ab0] mt-1.5 leading-snug">
                    Refine the directory by status, department and more
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 cursor-pointer rounded-[8px] flex items-center justify-center text-[#8b9ab0] hover:bg-white/5 hover:text-white transition-colors shrink-0 bg-white/[0.03]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="px-5 py-5 overflow-y-auto custom-scrollbar flex flex-col gap-5">
              <div>
                <label className="text-[13px] font-semibold text-white mb-2 block">
                  Gender
                </label>
                <SegmentedControl
                  value={localFilters.gender}
                  onChange={(v) =>
                    setLocalFilters({ ...localFilters, gender: v as any })
                  }
                  options={[
                    { value: "ALL", label: "All" },
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHERS", label: "Others" },
                    { value: "PREFER NOT TO SAY", label: "Prefer Not To Say" },
                  ]}
                />
              </div>

              <div>
                <label className="text-[13px] font-semibold text-white mb-2 block">
                  Department
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {departments.map((dept) => {
                    const isSelected = localFilters.department.some(
                      (d) => d.id == dept.id,
                    );

                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => {
                          const updatedDepartments = isSelected
                            ? localFilters.department.filter(
                                (d) => d.name !== dept.name,
                              )
                            : [...localFilters.department, dept];

                          setLocalFilters({
                            ...localFilters,
                            department: updatedDepartments,
                          });
                        }}
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 text-[13px] rounded-[10px] border transition-all ${
                          isSelected
                            ? "bg-[#1dc465]/10 border-[#1dc465]/40 text-[#1dc465] font-semibold"
                            : "bg-[#080d14] border-white/8 text-[#8b9ab0] hover:text-white hover:border-white/20"
                        }`}
                      >
                        <Stethoscope size={14} />

                        <span className="truncate">{dept.name}</span>

                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-white mb-2 block">
                  Sort by
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <RadioCard
                    label="Newest first"
                    checked={localFilters.sortBy === "NEWEST"}
                    onChange={() =>
                      setLocalFilters({ ...localFilters, sortBy: "NEWEST" })
                    }
                  />
                  <RadioCard
                    label="Oldest first"
                    checked={localFilters.sortBy === "OLDEST"}
                    onChange={() =>
                      setLocalFilters({ ...localFilters, sortBy: "OLDEST" })
                    }
                  />
                  <RadioCard
                    label="Name (A-Z)"
                    checked={localFilters.sortBy === "NAME_ASC"}
                    onChange={() =>
                      setLocalFilters({ ...localFilters, sortBy: "NAME_ASC" })
                    }
                  />
                  <RadioCard
                    label="Name (Z-A)"
                    checked={localFilters.sortBy === "NAME_DESC"}
                    onChange={() =>
                      setLocalFilters({ ...localFilters, sortBy: "NAME_DESC" })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-t border-white/8 bg-white/[0.02] shrink-0">
              <button
                onClick={handleReset}
                className="flex cursor-pointer items-center gap-2 text-[13px] text-[#8b9ab0] hover:text-white transition-colors font-medium"
              >
                <RefreshCcw size={15} />
                Reset all
              </button>

              <Button onClick={handleApply}>
                <Check size={15} />
                Show results
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
