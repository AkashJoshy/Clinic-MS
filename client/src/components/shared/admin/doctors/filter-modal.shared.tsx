import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, RefreshCcw, Stethoscope } from "lucide-react";

import { Button } from "../../../ui/button";
import { useAuthStore } from "@/store";
import { getContrastTextColor } from "@/helpers/color-palette.helper";
import {
  type DepartmentDoctorFilterDetails,
  type DoctorFilterModalProps,
  type DoctorFilterState,
} from "@/types/admin/doctor.types";
import { defaultDoctorFilters } from "@/constants/admin.constant";

export const DoctorFilterModal: React.FC<DoctorFilterModalProps> = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
  departments,
  role,
  isDark,
}) => {
  const [localFilters, setLocalFilters] =
    useState<DoctorFilterState>(initialFilters);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(initialFilters);
    }
  }, [isOpen, initialFilters]);

  const primaryColor = useAuthStore((state) => state.platform.primaryColor);

  const primaryTextColor = getContrastTextColor(primaryColor);

  const colors = {
    background: isDark ? "#0d1a27" : "#ffffff",
    surface: isDark ? "#080d14" : "#f9fafb",
    footer: isDark ? "rgba(255,255,255,0.02)" : "#f9fafb",
    heading: isDark ? "#ffffff" : "#111827",
    description: isDark ? "#8b9ab0" : "#6b7280",
    text: isDark ? "#8b9ab0" : "#6b7280",
    border: isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb",
    hoverBorder: isDark ? "rgba(255,255,255,0.2)" : "#d1d5db",
    closeBackground: isDark ? "rgba(255,255,255,0.03)" : "#f3f4f6",
    closeText: isDark ? "#8b9ab0" : "#6b7280",
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(defaultDoctorFilters);
  };

  const updateGender = (gender: DoctorFilterState["gender"]) => {
    setLocalFilters((prev) => ({
      ...prev,
      gender,
    }));
  };

  const updateSortBy = (sortBy: DoctorFilterState["sortBy"]) => {
    setLocalFilters((prev) => ({
      ...prev,
      sortBy,
    }));
  };

  const toggleDepartment = (dept: DepartmentDoctorFilterDetails) => {
    setLocalFilters((prev) => {
      const isSelected = prev.department.some(
        (department) => department.id === dept.id,
      );

      return {
        ...prev,
        department: isSelected
          ? prev.department.filter((department) => department.id !== dept.id)
          : [...prev.department, dept],
      };
    });
  };

  const genderOptions: {
    value: DoctorFilterState["gender"];
    label: string;
  }[] = [
    { value: "ALL", label: "All" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHERS", label: "Others" },
    { value: "PREFER NOT TO SAY", label: "Prefer Not To Say" },
  ];

  const sortOptions: {
    value: DoctorFilterState["sortBy"];
    label: string;
  }[] = [
    { value: "NEWEST", label: "Newest first" },
    { value: "OLDEST", label: "Oldest first" },
    { value: "NAME_ASC", label: "Name (A-Z)" },
    { value: "NAME_DESC", label: "Name (Z-A)" },
  ];

  const getOptionStyle = (selected: boolean): React.CSSProperties => ({
    borderColor: selected ? primaryColor : colors.border,
    backgroundColor: selected
      ? `color-mix(in srgb, ${primaryColor} 12%, transparent)`
      : colors.surface,
    color: selected ? primaryColor : colors.text,
    fontWeight: selected ? 600 : 500,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed -inset-6.25 z-100 bg-black/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
            style={{
              backgroundColor: colors.background,
              borderColor: colors.border,
            }}
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[88vh] w-[92vw] max-w-[440px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[16px] border shadow-2xl"
          >
            {/* Header */}
            <div
              style={{ borderColor: colors.border }}
              className="shrink-0 border-b px-5 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    style={{ color: colors.heading }}
                    className="text-base font-bold leading-none tracking-tight"
                  >
                    Filter doctors
                  </h2>

                  <p
                    style={{ color: colors.description }}
                    className="mt-1.5 text-[13px] leading-snug"
                  >
                    Refine the directory by status, department and more
                  </p>
                </div>

                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: colors.closeBackground,
                    color: colors.closeText,
                  }}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] transition-opacity hover:opacity-75"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div
              className={`custom-scrollbar flex flex-col gap-5 overflow-y-auto px-5 py-5 ${
                isDark ? "scrollbar-dark" : "scrollbar-light"
              }`}
            >
              {/* Gender */}
              <div>
                <label
                  style={{ color: colors.heading }}
                  className="mb-2 block text-[13px] font-semibold"
                >
                  Gender
                </label>

                <div className="flex flex-wrap gap-2">
                  {genderOptions.map((option) => {
                    const isSelected = localFilters.gender === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateGender(option.value)}
                        style={getOptionStyle(isSelected)}
                        className="rounded-[9px] border px-3 py-2 text-[12px] transition-all hover:opacity-80"
                        onMouseEnter={(event) => {
                          if (!isSelected) {
                            event.currentTarget.style.borderColor =
                              primaryColor;
                            event.currentTarget.style.backgroundColor = `color-mix(in srgb, ${primaryColor} 12%, transparent)`;
                            event.currentTarget.style.color = primaryColor;
                          }
                        }}
                        onMouseLeave={(event) => {
                          if (!isSelected) {
                            Object.assign(
                              event.currentTarget.style,
                              getOptionStyle(false),
                            );
                          }
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Department */}
              <div>
                <label
                  style={{ color: colors.heading }}
                  className="mb-2 block text-[13px] font-semibold"
                >
                  Department
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {departments.map((dept) => {
                    const isSelected = localFilters.department.some(
                      (department) => department.id === dept.id,
                    );

                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => toggleDepartment(dept)}
                        style={getOptionStyle(isSelected)}
                        className="flex items-center justify-center gap-2 rounded-[10px] border px-3 py-2.5 text-[13px] transition-all hover:opacity-80"
                        onMouseEnter={(event) => {
                          if (!isSelected) {
                            event.currentTarget.style.borderColor =
                              primaryColor;
                            event.currentTarget.style.backgroundColor = `color-mix(in srgb, ${primaryColor} 12%, transparent)`;
                            event.currentTarget.style.color = primaryColor;
                          }
                        }}
                        onMouseLeave={(event) => {
                          if (!isSelected) {
                            Object.assign(
                              event.currentTarget.style,
                              getOptionStyle(false),
                            );
                          }
                        }}
                      >
                        <Stethoscope size={14} className="shrink-0" />

                        <span className="truncate">{dept.name}</span>

                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label
                  style={{ color: colors.heading }}
                  className="mb-2 block text-[13px] font-semibold"
                >
                  Sort by
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => {
                    const isSelected = localFilters.sortBy === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateSortBy(option.value)}
                        style={getOptionStyle(isSelected)}
                        className="flex items-center justify-between gap-2 rounded-[10px] border px-3 py-3 text-[13px] transition-all hover:opacity-80"
                        onMouseEnter={(event) => {
                          if (!isSelected) {
                            event.currentTarget.style.borderColor =
                              primaryColor;
                            event.currentTarget.style.backgroundColor = `color-mix(in srgb, ${primaryColor} 12%, transparent)`;
                            event.currentTarget.style.color = primaryColor;
                          }
                        }}
                        onMouseLeave={(event) => {
                          if (!isSelected) {
                            Object.assign(
                              event.currentTarget.style,
                              getOptionStyle(false),
                            );
                          }
                        }}
                      >
                        <span>{option.label}</span>

                        {isSelected && <Check size={15} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              style={{
                borderColor: colors.border,
                backgroundColor: colors.footer,
              }}
              className="flex shrink-0 items-center justify-between border-t px-5 py-4"
            >
              <button
                onClick={handleReset}
                style={{ color: colors.text }}
                className="flex cursor-pointer items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-70"
              >
                <RefreshCcw size={15} />
                Reset all
              </button>

              <Button
                onClick={handleApply}
                style={{
                  backgroundColor: primaryColor,
                  color: primaryTextColor,
                }}
                className="transition-opacity hover:opacity-90"
              >
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

export default DoctorFilterModal;
