import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, RefreshCcw } from "lucide-react";
import { Button } from "../../../ui/button";
import { RadioCard } from "../../radio-card.tsx";
import { SegmentedControl } from "../../segmented-control.shared.tsx";

export interface PatientFilterState {
  status: "ALL" | "ACTIVE" | "INACTIVE";
  gender: "ALL" | "MALE" | "FEMALE" | "OTHERS" | "PREFER NOT TO SAY";
  sortBy: "NEWEST" | "OLDEST" | "NAME_ASC" | "NAME_DESC";
}

export const defaultPatientFilters: PatientFilterState = {
  status: "ALL",
  gender: "ALL",
  sortBy: "NEWEST",
};

export interface DoctorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PatientFilterState;
  onApplyFilters: (filters: PatientFilterState) => void;
  isDark: boolean;
}

export const PatientFilterModal: React.FC<DoctorFilterModalProps> = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
  isDark,
}) => {
  const [localFilters, setLocalFilters] =
    useState<PatientFilterState>(initialFilters);

  useEffect(() => {
    if (isOpen) setLocalFilters(initialFilters);
  }, [isOpen, initialFilters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => setLocalFilters(defaultPatientFilters);

  const theme = {
    modal: isDark ? "bg-[#0d1a27] border-white/8" : "bg-white border-gray-200",
    headerBorder: isDark ? "border-white/8" : "border-gray-200",
    heading: isDark ? "text-white" : "text-gray-900",
    description: isDark ? "text-[#8b9ab0]" : "text-gray-500",
    closeButton: isDark
      ? "text-[#8b9ab0] bg-white/3 hover:bg-white/5 hover:text-white"
      : "text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900",
    sectionLabel: isDark ? "text-white" : "text-gray-900",
    footer: isDark ? "bg-white/2" : "bg-gray-50",
    resetButton: isDark
      ? "text-[#8b9ab0] hover:text-white"
      : "text-gray-500 hover:text-gray-900",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed -inset-6.25 z-100 backdrop-blur-sm ${
              isDark ? "bg-black/50" : "bg-gray-900/30"
            }`}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
            className={`fixed z-101 flex flex-col overflow-hidden border shadow-2xl
              left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-[92vw] max-w-110 rounded-3xl max-h-[88vh]
              ${theme.modal}`}
          >
            {/* Header */}
            <div
              className={`px-5 py-4 border-b shrink-0 ${theme.headerBorder}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    className={`text-base font-bold tracking-tight leading-none ${theme.heading}`}
                  >
                    Filter Patients
                  </h2>

                  <p
                    className={`text-[13px] mt-1.5 leading-snug ${theme.description}`}
                  >
                    Refine the directory by status, gender and more
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className={`w-8 h-8 cursor-pointer rounded-xl flex items-center justify-center transition-colors shrink-0 ${theme.closeButton}`}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Filter options */}
            <div className="px-5 py-5 overflow-y-auto custom-scrollbar flex flex-col gap-5">
              <div>
                <label
                  className={`text-[13px] font-semibold mb-2 block ${theme.sectionLabel}`}
                >
                  Status
                </label>

                <SegmentedControl
                  value={localFilters.status}
                  isDark={isDark}
                  onChange={(v) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      status: v as PatientFilterState["status"],
                    }))
                  }
                  options={[
                    { value: "ALL", label: "All" },
                    { value: "ACTIVE", label: "Active" },
                    { value: "INACTIVE", label: "Inactive" },
                  ]}
                />
              </div>

              <div>
                <label
                  className={`text-[13px] font-semibold mb-2 block ${theme.sectionLabel}`}
                >
                  Gender
                </label>

                <SegmentedControl
                  value={localFilters.gender}
                  isDark={isDark}
                  onChange={(v) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      gender: v as PatientFilterState["gender"],
                    }))
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
                <label
                  className={`text-[13px] font-semibold mb-2 block ${theme.sectionLabel}`}
                >
                  Sort by
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <RadioCard
                    label="Newest first"
                    checked={localFilters.sortBy === "NEWEST"}
                    isDark={isDark}
                    onChange={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        sortBy: "NEWEST",
                      }))
                    }
                  />

                  <RadioCard
                    label="Oldest first"
                    checked={localFilters.sortBy === "OLDEST"}
                    isDark={isDark}
                    onChange={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        sortBy: "OLDEST",
                      }))
                    }
                  />

                  <RadioCard
                    label="Name (A-Z)"
                    checked={localFilters.sortBy === "NAME_ASC"}
                    isDark={isDark}
                    onChange={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        sortBy: "NAME_ASC",
                      }))
                    }
                  />

                  <RadioCard
                    label="Name (Z-A)"
                    checked={localFilters.sortBy === "NAME_DESC"}
                    isDark={isDark}
                    onChange={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        sortBy: "NAME_DESC",
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`flex items-center justify-between px-5 py-4 border-t shrink-0 ${theme.headerBorder} ${theme.footer}`}
            >
              <button
                type="button"
                onClick={handleReset}
                className={`flex cursor-pointer items-center gap-2 text-[13px] transition-colors font-medium ${theme.resetButton}`}
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
